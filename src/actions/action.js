"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { delKey } from "@/lib/utils/cached";
import prisma from "@/lib/prisma";

const CACHE_KEY = "restaurants:all";
/**
 * Server action to add a new Restaurant
 * @param {FormData} formData - data submitted from the form
 * @returns {Object} success or error response
 */
export async function addRestaurant(formData) {
  try {
    // Extract form fields
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const imageUrl = formData.get("imageUrl") || null;
    const isOpen = formData.get("isOpen") === "on"; // Checkbox value
    const isActive = formData.get("isActive") === "on"; // Checkbox value

    // Validate required fields
    if (!name || !phone || !address) {
      return { error: "Missing required fields" };
    }

    // Create restaurant record in DB
    await prisma.restaurant.create({
      data: {
        name,
        phone,
        address,
        imageUrl,
        isOpen,
        isActive,
      },
    });
    await delKey(CACHE_KEY);

    return { success: true };
  } catch (err) {
    console.error("Create failed:", err);
    return { error: "Something went wrong" };
  }
}

/**
 * Server action to add a new Menu item with optional Add-Ons
 * @param {FormData} formData - data submitted from the form
 */
export async function addMenuWithAddOns(formData) {
  // Extract main menu fields
  const name = formData.get("name");
  const price = parseFloat(formData.get("price"));
  const category = formData.get("category");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");
  const isActive = formData.get("isActive") === "on";
  const restaurantId = formData.get("restaurantId");

  // Extract Add-On arrays (multiple values)
  const addOnNames = formData.getAll("addOnName");
  const addOnPrices = formData.getAll("addOnPrice");

  // Map Add-Ons to objects
  const addOns = addOnNames
    .map((name, i) => ({
      name: name.trim(),
      price: parseFloat(addOnPrices[i]),
    }))
    .filter((addOn) => addOn.name !== "" && !isNaN(addOn.price));

  // Debugging: log Add-Ons to server console
  console.log("🧩 AddOns submitted:", addOns);

  // Create menu with nested addOns creation
  await prisma.menu.create({
    data: {
      name,
      price,
      category,
      description,
      imageUrl,
      isActive,
      restaurantId,
      addOns: addOns.length > 0 ? { create: addOns } : undefined,
    },
  });
  const CACHE_KEY = `menu:all:${restaurantId}`;
  await delKey(CACHE_KEY);
  console.log(`🗑️ Deleted cache key: ${CACHE_KEY}`);
  // Revalidate cache for the menu page
  revalidatePath(`/canteens/${restaurantId}/menu`);

  // Redirect user after successful creation
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

  revalidatePath(`/tests/restaurants/${restaurantId}/menu`);
  redirect(`/tests/restaurants/${restaurantId}/menu`);
}
