"use server";

import { redis } from "@/lib/redis";

// Helper function to generate Redis cart key for a user
const getCartKey = (userId) => `cart:${userId}`;

/**
 * Add an item to the user's cart in Redis.
 */
export async function addToCartAction(
  userId = 123,
  menuId,
  quantity,
  addOns,
  CACHE_ttl = 300
) {
  const key = getCartKey(userId);

  // Fetch existing cart data from Redis
  const cart = (await redis.get(key)) || [];

  // Check if the item (with same menuId and addOns) already exists
  const existingIndex = cart.findIndex(
    (item) =>
      item.menuId === menuId &&
      JSON.stringify(item.addOns) === JSON.stringify(addOns)
  );

  console.log("existingIndex", existingIndex);

  if (existingIndex > -1) {
    // If found, update the quantity
    cart[existingIndex].quantity += quantity;
  } else {
    // If not found, add as new item
    cart.push({ menuId, quantity, addOns });
  }

  // Save updated cart to Redis
  await redis.set(key, JSON.stringify(cart), { ex: CACHE_ttl });
}

/**
 * Retrieve the user's cart from Redis.
 */
export async function getCartAction(userId) {
  const cart = await redis.get(getCartKey(userId));
  console.log("Cart data", cart);
  return cart || [];
}

/**
 * Remove an item from the user's cart based on menuId.
 */
export async function removeFromCartAction(userId, menuId) {
  const key = getCartKey(userId);
  const cart = await redis.get(key);
  if (!cart) return;

  // Filter out the item to remove
  const updated = cart.filter((item) => item.menuId !== menuId);

  // Save updated cart
  await redis.set(key, JSON.stringify(updated));
}

/**
 * Update quantity of a specific item in the user's cart.
 */
export async function updateCartQuantity(userId, menuId, quantity) {
  const key = getCartKey(userId);
  const cart = await redis.get(key);

  // Update the quantity for the matching item
  const updatedCart = cart.map((item) =>
    item.menuId === menuId ? { ...item, quantity } : item
  );

  // Save updated cart to Redis
  await redis.set(key, JSON.stringify(updatedCart));
}
