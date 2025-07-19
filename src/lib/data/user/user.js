import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getUserProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}

export async function getUser() {
  const kindeUser = await getUserProfile();

  const user = await prisma.user.findUnique({
    where: { id: kindeUser.id },
    select: { id: true, name: true, role: true },
  });

  return user;
}
