"use server";

import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Initialize Prisma Client once to avoid multiple instances in development
let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

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
  const addOns = addOnNames.map((name, i) => ({
    name,
    price: parseFloat(addOnPrices[i]),
  }));

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
      addOns: {
        create: addOns,
      },
    },
  });

  // Revalidate cache for the menu page
  revalidatePath(`/tests/restaurants/${restaurantId}/menu`);

  // Redirect user after successful creation
  redirect(`/tests/restaurants/${restaurantId}/menu`);
}
