// /lib/actions/assignCanteenToAdmin.js
"use server";

import prisma from "@/lib/prisma";

export async function assignCanteenToAdmin(adminId, restaurantId) {
  const admin = await prisma.user.findUnique({
    where: { id: adminId },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("User is not an admin");
  }

  await prisma.user.update({
    where: { id: adminId },
    data: { restaurantId },
  });

  return { success: true };
}
