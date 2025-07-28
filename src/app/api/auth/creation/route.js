import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // Ensure required fields are present
  if (!kindeUser?.id || !kindeUser?.email || !kindeUser?.given_name) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Upsert the user to avoid unique constraint error on email
  const user = await prisma.user.upsert({
    where: {
      email: kindeUser.email,
    },
    update: {}, // Add fields to update if needed
    create: {
      id: kindeUser.id,
      name: `${kindeUser.given_name}${
        kindeUser.family_name ? " " + kindeUser.family_name : ""
      }`,
      email: kindeUser.email,
      profileImage: kindeUser.picture || null,
      role: "CUSTOMER", // Default role
    },
  });

  // Redirect based on role
  if (user.role === "CUSTOMER") {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}
