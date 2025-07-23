"use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { redis } from "@/lib/redis";
import { delKey } from "@/lib/utils/cached";
import { redirect } from "next/navigation";

// Helper function to generate Redis cart key for a user
const getCartKey = (userId) => `cart:${userId}`;

/**
 * Add an item to the user's cart in Redis.
 */
export async function addToCartAction(
  userId = "guest",
  menuId,
  quantity,
  addOns = [],
  CACHE_ttl = 300
) {
  const key = getCartKey(userId);

  // Fetch and parse cart
  const raw = await redis.get(key);
  let cart = [];

  try {
    cart = raw || [];
  } catch (err) {
    console.error("Failed to parse cart from Redis:", err);
  }



  const existingIndex = cart.findIndex(
    (item) =>
      item.menuId === menuId &&
      JSON.stringify(item.addOns) === JSON.stringify(addOns)
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ menuId, quantity, addOns });
  }

  // Save back to Redis
  try {
    await redis.set(key, JSON.stringify(cart), { ex: CACHE_ttl });
    console.log("Cart saved:", cart);
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
}

/**
 * Retrieve the user's cart from Redis.
 */
export async function getCartAction(userId = "guest") {
  const cart = await redis.get(getCartKey(userId));
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

export async function placeOrder(formData) {
  const userId = formData.get("userId");
  if (!userId) throw new Error("User ID missing");

  const cartRaw = await redis.get(getCartKey(userId));
  if (!cartRaw) throw new Error("Cart is empty");

  const cart = cartRaw;
  if (!cart.length) throw new Error("Cart is empty");

  // Fetch full menu info for each cart item
  const enrichedCart = await Promise.all(
    cart.map(async (item) => {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menuId },
        include: { addOns: true },
      });
      return { ...item, menu };
    })
  );

  const restaurantId = enrichedCart[0].menu.restaurantId;

  let totalPrice = 0;
  for (const item of enrichedCart) {
    const addons = item.addOns
      .map((id) => item.menu.addOns.find((a) => a.id === id))
      .filter(Boolean);
    const addonTotal = addons.reduce((sum, a) => sum + (a?.price || 0), 0);
    totalPrice += (item.menu.price + addonTotal) * item.quantity;
  }

  const order = await prisma.order.create({
    data: {
      userId,
      restaurantId,
      totalPrice,
      status: "PENDING",
      orderItems: {
        create: enrichedCart.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
          price: item.menu.price,
          orderItemAddOns: {
            create: item.addOns.map((addOnId) => ({ addOnId })),
          },
        })),
      },
    },
  });

  // Clear related Redis caches
  await delKey(`orders:restaurant:${restaurantId}`);
  await delKey(`orders:restaurant:${restaurantId}:today`);
  await redis.del(getCartKey(userId));

  // Fetch full enriched order with user and nested relations
  const fullOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: {
      user: true,
      orderItems: {
        include: {
          menu: true,
          orderItemAddOns: {
            include: {
              addOn: true,
            },
          },
        },
      },
    },
  });

  // Trigger Pusher event with full order data
  await pusherServer.trigger(
    `restaurant-${restaurantId}`,
    "order:new",
    fullOrder
  );

  redirect(`/order/confirmation?orderId=${order.id}`);
}
