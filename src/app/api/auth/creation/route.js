import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(request) {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser?.id || !kindeUser?.email || !kindeUser?.given_name) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Upsert user in database
  const user = await prisma.user.upsert({
    where: { email: kindeUser.email },
    update: {},
    create: {
      id: kindeUser.id,
      name: `${kindeUser.given_name}${
        kindeUser.family_name ? " " + kindeUser.family_name : ""
      }`,
      email: kindeUser.email,
      profileImage: kindeUser.picture || null,
      role: "CUSTOMER",
    },
  });

  // Merge guest cart into user cart
  const guestKey = "cart:guest";
  const userKey = `cart:${user.id}`;

  const guestCart = await redis.get(guestKey);
  if (guestCart) {
    // Read user cart, default to empty array
    const userCart = (await redis.get(userKey)) || [];
    const mergedCart = [...userCart];

    for (const gItem of guestCart) {
      const index = mergedCart.findIndex(
        (uItem) =>
          uItem.menuId === gItem.menuId &&
          JSON.stringify(uItem.addOns) === JSON.stringify(gItem.addOns)
      );

      if (index > -1) {
        mergedCart[index].quantity += gItem.quantity;
      } else {
        mergedCart.push(gItem);
      }
    }

    // Store merged cart
    await redis.set(userKey, mergedCart, { ex: 600 });
    await redis.del(guestKey);
  }

  // Decide redirect location
  const userCart = await redis.get(userKey);
  let redirectUrl;

  if (userCart && userCart.length > 0) {
    // Cart exists → go to place-order
    redirectUrl = new URL(
      `/place-order?userId=${user.id}&role=${user.role}`,
      request.url
    );
  } else {
    // No cart → go to homepage
    redirectUrl = new URL("/", request.url);
  }

  const response = NextResponse.redirect(redirectUrl);

  // Set role cookie
  response.cookies.set("role", user.role, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
