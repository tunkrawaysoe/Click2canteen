import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
  // Get user from Kinde server session
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // If user is not authenticated or missing data, redirect to login
  if (!kindeUser?.id || !kindeUser?.email || !kindeUser?.given_name) {
    return redirect("/login");
  }

  // Check if user already exists in the DB
  const existingUser = await prisma.user.findUnique({
    where: { id: kindeUser.id },
  });

  // If not, create the new user in the DB
 if (!existingUser) {
  await prisma.user.create({
    data: {
      id: kindeUser.id,
      name: `${kindeUser.given_name} ${kindeUser.family_name}`, 
      email: kindeUser.email,
      profileImage: kindeUser.picture ?? null,
      role: "CUSTOMER",
    },
  });
}

  

  // Redirect to home page after login or signup
  return redirect("/");
}
