"use server";

import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { redis } from "@/lib/redis";
import { delKey } from "@/lib/utils/cached";
import { redirect } from "next/navigation";
import { enrichCart, calculateTotal } from "@/lib/data/cart/enrichedcart";
import { getUserProfile } from "@/lib/data/user/user";
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
  CACHE_ttl = 600
) {
  const key = getCartKey(userId);

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
  const paymentMethod = formData.get("paymentMethod") || "cash";
  const paymentUrl = formData.get("paymentProofUrl") || null;
  const serviceType = formData.get("serviceType") || "SELF_SERVICE";
  const phoneNumber = formData.get("phoneNumber") || null;
  const deliveryAddress = formData.get("deliveryAddress") || null;
  const user = await getUserProfile();
  if (!user) {
    redirect("/api/auth/login?post_login_redirect_url=/place-order");
  }

  if (paymentMethod === "kbzpay" && !paymentUrl) {
    return { error: "Payment proof image is required for KBZ Pay." };
  }

  if (serviceType === "DELIVERY") {
    if (!phoneNumber || !deliveryAddress) {
      return {
        error: "Phone number and delivery address are required for delivery.",
      };
    }
  }

  const cartRaw = await redis.get(getCartKey(userId));
  if (!cartRaw || !cartRaw.length) {
    return { error: "Cart is empty." };
  }

  const enrichedCart = await enrichCart(cartRaw);
  const restaurantId = enrichedCart[0].menu.restaurantId;
  const totalPrice = calculateTotal(enrichedCart);

  const order = await prisma.order.create({
    data: {
      userId,
      restaurantId,
      totalPrice,
      status: "PENDING",
      paymentMethod,
      paymentUrl,
      phoneNumber,
      deliveryAddress,
      serviceType,
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

  await delKey(`orders:restaurant:${restaurantId}`);
  await delKey(`orders:restaurant:${restaurantId}:today`);
  await redis.del(getCartKey(userId));

  const fullOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: {
      user: true,
      orderItems: {
        include: {
          menu: true,
          orderItemAddOns: { include: { addOn: true } },
        },
      },
    },
  });

  await pusherServer.trigger(
    `restaurant-${restaurantId}`,
    "order:new",
    fullOrder
  );

  redirect(`/order-confirm?orderId=${order.id}`);
}
