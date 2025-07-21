"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUserAction(formData) {
  const id = formData.get("id");
  const role = formData.get("role");
  const restaurantId = formData.get("restaurantId");

  try {
    await prisma.user.update({
      where: { id },
      data: {
        role,
        restaurantId: role === "ADMIN" ? restaurantId || null : null,
      },
    });

    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Update failed:", error);
    throw new Error("User update failed");
  }
  redirect("/admin/users");
}
