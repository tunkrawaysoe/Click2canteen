import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser?.id || !kindeUser?.email || !kindeUser?.given_name) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let user = await prisma.user.findUnique({
    where: { id: kindeUser.id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: kindeUser.id,
        name: `${kindeUser.given_name}${kindeUser.family_name ? " " + kindeUser.family_name : ""}`,
        email: kindeUser.email,
        profileImage: kindeUser.picture || null,
        role: "CUSTOMER", // Default for new users
      },
    });
  }

  // ✅ Redirect based on role
  if (user.role === "CUSTOMER") {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}
