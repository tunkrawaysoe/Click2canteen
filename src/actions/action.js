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
  const imageUrl = formData.get("imageUrl");
  const isActive = formData.get("isActive") === "on";
  const isSpecial = formData.get("isSpecial") === "on";
  const restaurantId = formData.get("restaurantId");

  // Get all add-ons
  const addOnNames = formData.getAll("addOnName");
  const addOnPrices = formData.getAll("addOnPrice");

  const addOns = addOnNames
    .map((name, i) => ({
      name: name.trim(),
      price: parseFloat(addOnPrices[i]),
    }))
    .filter((addOn) => addOn.name !== "" && !isNaN(addOn.price));

  console.log("🧩 AddOns submitted:", addOns);

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
      // DO NOT include a `restaurant` field here
    },
  });

  const CACHE_KEY = `menu:all:${restaurantId}`;
  await delKey(CACHE_KEY);
  console.log(`🗑️ Deleted cache key: ${CACHE_KEY}`);

  revalidatePath(`/canteens/${restaurantId}/menu`);

  redirect(`/canteens/${restaurantId}/menu`);
}

export async function updateMenuWithAddOns(formData) {
  const menuId = formData.get("menuId");
  const restaurantId = formData.get("restaurantId");

  if (!menuId || !restaurantId) {
    throw new Error("Missing menuId or restaurantId");
  }

  // Extract main fields
  const name = formData.get("name") || "";
  const price = parseFloat(formData.get("price") || "0");
  const category = formData.get("category") || "MAIN";
  const description = formData.get("description") || "";
  const imageUrl = formData.get("imageUrl") || "";
  const isActive = formData.get("isActive") === "on";
  const isSpecial = formData.get("isSpecial") === "on";

  // Extract add-ons
  const addOnNames = formData.getAll("addOnName");
  const addOnPrices = formData.getAll("addOnPrice");

  const newAddOns = addOnNames
    .map((name, i) => ({
      name: name.trim(),
      price: parseFloat(addOnPrices[i]),
    }))
    .filter((a) => a.name !== "" && !isNaN(a.price));

  console.log("🔁 Updating menu:", menuId);
  console.log("🧩 New AddOns:", newAddOns);

  // Transaction: update menu + delete old addOns + create new ones
  await prisma.$transaction([
    // Update the menu
    prisma.menu.update({
      where: { id: menuId },
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

    // Delete all previous addOns
    prisma.addOn.deleteMany({
      where: { menuId },
    }),

    // Add the new ones if any
    ...(newAddOns.length > 0
      ? [
          prisma.addOn.createMany({
            data: newAddOns.map((a) => ({
              ...a,
              menuId,
            })),
          }),
        ]
      : []),
  ]);

  await delKey(`menu:all:${restaurantId}`);
  await delKey(`menu:single:${menuId}`);

  revalidatePath(`/canteens/${restaurantId}/menu`);
  redirect(`/canteens/${restaurantId}/menu`);
}