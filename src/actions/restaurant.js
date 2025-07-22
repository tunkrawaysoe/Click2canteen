"use server";

import prisma from "@/lib/prisma";
import { delKey } from "@/lib/utils/cached";
import { revalidatePath } from "next/cache";

// Use consistent cache key for restaurant list caching
const CACHE_KEY = "restaurants:all";

/**
 * Adds a new restaurant to the database
 * @param {FormData} formData
 * @returns {Object} success or error object
 */
export async function addRestaurant(formData) {
  try {
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const imageUrl = formData.get("imageUrl") || null;
    const isOpen = formData.get("isOpen") === "on";
    const isActive = formData.get("isActive") === "on";

    // Validate required fields
    if (!name || !phone || !address) {
      return { error: "Missing required fields" };
    }

    // Create restaurant record
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

    // Invalidate cache to reflect new restaurant
    await delKey(CACHE_KEY);

    // Optionally revalidate pages showing restaurants
    revalidatePath("/canteens");

    return { success: true };
  } catch (err) {
    console.error("❌ Create failed:", err);
    return { error: "Something went wrong while creating restaurant" };
  }
}

export async function updateRestaurant(formData) {
  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const imageUrl = formData.get("imageUrl") || null;
    const isOpen = formData.get("isOpen") === "on";
    const isActive = formData.get("isActive") === "on";

    // Validation
    if (!id || !name || !phone || !address) {
      return { error: "Missing required fields" };
    }

    // Update restaurant record
    await prisma.restaurant.update({
      where: { id },
      data: {
        name,
        phone,
        address,
        imageUrl,
        isOpen,
        isActive,
      },
    });

    // Invalidate and revalidate
    await delKey(CACHE_KEY);
    revalidatePath("/canteens");

    return { success: true };
  } catch (err) {
    console.error("❌ Update failed:", err);
    return { error: "Something went wrong while updating restaurant" };
  }
}

/**
 * Deletes a restaurant and all related data
 * @param {string} restaurantId
 * @returns {Object} success or error object
 */
export async function deleteRestaurant(restaurantId) {
  if (!restaurantId) {
    return { error: "Restaurant ID is required" };
  }

  try {
    // Check if restaurant exists before deleting
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      return { error: "Restaurant not found" };
    }

    // Run deletes in correct order inside transaction to avoid FK errors
    await prisma.$transaction([
      // Delete orderItemAddOns linked to orderItems of this restaurant
      prisma.orderItemAddOn.deleteMany({
        where: {
          orderItem: {
            order: { restaurantId },
          },
        },
      }),

      // Delete orderItems linked to orders of this restaurant
      prisma.orderItem.deleteMany({
        where: { order: { restaurantId } },
      }),

      // Delete orders belonging to this restaurant
      prisma.order.deleteMany({
        where: { restaurantId },
      }),

      // Delete addOns linked via menus in this restaurant
      prisma.addOn.deleteMany({
        where: { menu: { restaurantId } },
      }),

      // Delete menus belonging to this restaurant
      prisma.menu.deleteMany({
        where: { restaurantId },
      }),

      // Optional: unlink users from this restaurant
      prisma.user.updateMany({
        where: { restaurantId },
        data: { restaurantId: null },
      }),

      // Finally delete the restaurant itself
      prisma.restaurant.delete({
        where: { id: restaurantId },
      }),
    ]);

    // Invalidate cache after deletion
    await delKey(CACHE_KEY);

    // Revalidate Next.js ISR for restaurant listing page
    revalidatePath("/canteens");

    console.log("✅ Restaurant and all related data deleted successfully.");
    return { success: true };
  } catch (err) {
    console.error("❌ Failed to delete restaurant:", err);
    return { error: "Failed to delete restaurant" };
  }
}
