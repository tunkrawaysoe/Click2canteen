"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { delKey } from "@/lib/utils/cached";
import prisma from "@/lib/prisma";

/**
 * Server action to add a new Menu item with optional Add-Ons
 * @param {FormData} formData - data submitted from the form
 */
export async function addMenuWithAddOns(formData) {
  const name = formData.get("name");
  const price = parseFloat(formData.get("price"));
  const category = formData.get("category");
  const description = formData.get("description");
  const imageUrl = formData.get("image");
  const isActive = formData.get("isActive") === "on";
  const isSpecial = formData.get("isSpecial") === "on";
  const restaurantId = formData.get("restaurantId");

  if (!name || !price || !category || !restaurantId) {
    throw new Error("Missing required menu fields");
  }
  console.log("isspecial",isSpecial)

  // Get all add-ons
  const addOnNames = formData.getAll("addOnName");
  const addOnPrices = formData.getAll("addOnPrice");

  const addOns = addOnNames
    .map((name, i) => ({
      name: name.trim(),
      price: parseFloat(addOnPrices[i]),
    }))
    .filter((addOn) => addOn.name !== "" && !isNaN(addOn.price));

  await prisma.menu.create({
    data: {
      name,
      price,
      category,
      description,
      imageUrl,
      isActive,
      isSpecial,
      restaurantId,
      addOns: addOns.length > 0 ? { create: addOns } : undefined,
    },
  });

  // Cache cleanup
  const CACHE_KEY = `menu:all:${restaurantId}`;
  await delKey(CACHE_KEY);
  console.log(`🗑️ Deleted cache key: ${CACHE_KEY}`);

  if (isSpecial) {
    const CACHE_KEY_SPECIAL = `menu:special:all`;
    await delKey(CACHE_KEY_SPECIAL);
    console.log(`🗑️ Deleted cache key: ${CACHE_KEY_SPECIAL}`);
  }

  revalidatePath(`/admin/canteens`);
  redirect(`/admin/canteens`);
}

export async function updateMenuWithAddOns(formData) {
  const menuId = formData.get("menuId");
  const restaurantId = formData.get("restaurantId");

  if (!menuId || !restaurantId) {
    throw new Error("Missing menuId or restaurantId");
  }

  const name = formData.get("name")?.toString() || "";
  const price = parseFloat(formData.get("price")?.toString() || "0");
  const category = formData.get("category")?.toString() || "MAIN";
  const description = formData.get("description")?.toString() || "";
  const imageUrl = formData.get("image")?.toString() || "";
  const isActive = formData.get("isActive") === "on";
  const isSpecial = formData.get("isSpecial") === "on";

  const addOnNames = formData.getAll("addOnName");
  const addOnPrices = formData.getAll("addOnPrice");

  const newAddOns = addOnNames
    .map((name, i) => ({
      name: name.toString().trim(),
      price: parseFloat(addOnPrices[i]?.toString() || "0"),
    }))
    .filter((a) => a.name !== "" && !isNaN(a.price));

  const existingAddOns = await prisma.addOn.findMany({
    where: { menuId: menuId.toString() },
    select: { id: true },
  });

  const addOnIds = existingAddOns.map((a) => a.id);

  await prisma.$transaction([
    prisma.orderItemAddOn.deleteMany({
      where: {
        addOnId: { in: addOnIds },
      },
    }),

    prisma.addOn.deleteMany({
      where: { menuId: menuId.toString() },
    }),

    prisma.menu.update({
      where: { id: menuId.toString() },
      data: {
        name,
        price,
        category,
        description,
        imageUrl,
        isActive,
        isSpecial,
      },
    }),

    ...(newAddOns.length > 0
      ? [
          prisma.addOn.createMany({
            data: newAddOns.map((a) => ({
              ...a,
              menuId: menuId.toString(),
            })),
          }),
        ]
      : []),
  ]);

  await delKey(`menu:all:${restaurantId}`);
  await delKey(`menu:single:${menuId}`);

  revalidatePath(`admin/canteens`);
  redirect(`/admin/canteens`);
}
