"use server";
import prisma from "@/lib/prisma";
import { delKey } from "@/lib/utils/cached";

const CACHE_KEY = "restaurants:all";

/**
 * Adds a new restaurant to the database
 * @param {FormData} formData
 * @returns {Object} success or error
 */
export async function addRestaurant(formData) {
  try {
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const imageUrl = formData.get("imageUrl") || null;
    const isOpen = formData.get("isOpen") === "on";
    const isActive = formData.get("isActive") === "on";

    if (!name || !phone || !address) {
      return { error: "Missing required fields" };
    }

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
    return { error: "Something went wrong while creating restaurant" };
  }
}

/**
 * Deletes a restaurant and all related data
 * @param {string} restaurantId
 * @returns {Object} success or error
 */
export async function deleteRestaurant(restaurantId) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      return { error: "Restaurant not found" };
    }

    await prisma.$transaction([
      prisma.addOn.deleteMany({
        where: { menu: { restaurantId } },
      }),
      prisma.menu.deleteMany({
        where: { restaurantId },
      }),
      prisma.orderItemAddOn.deleteMany({
        where: { orderItem: { order: { restaurantId } } },
      }),
      prisma.orderItem.deleteMany({
        where: { order: { restaurantId } },
      }),
      prisma.order.deleteMany({
        where: { restaurantId },
      }),
      prisma.user.updateMany({
        where: { restaurantId },
        data: { restaurantId: null },
      }),
      prisma.restaurant.delete({
        where: { id: restaurantId },
      }),
    ]);

    await delKey(CACHE_KEY);

    // Revalidate the page or route that shows restaurants
    revalidatePath("/canteens"); // replace with your actual route path

    console.log("✅ Restaurant and related data deleted successfully.");
    return { success: true };
  } catch (err) {
    console.error("❌ Failed to delete restaurant:", err);
    return { error: "Failed to delete restaurant" };
  }
}
