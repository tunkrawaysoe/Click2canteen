import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}

export async function getUser() {
  const kindeUser = await getUserProfile();

  if (!kindeUser) {
    // Return a guest user object when not authenticated
    return {
      id: null,
      name: "Guest",
      role: "GUEST", // define a GUEST role in your RBAC roles
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: kindeUser.id },
    select: { id: true, name: true, role: true },
  });

  // If user not found in DB, fallback to guest as well
  if (!user) {
    return {
      id: null,
      name: "Guest",
      role: "GUEST",
    };
  }

  return user;
}
