import prisma from "@/lib/prisma";
import { getCachedData, setCachedData, delKey } from "@/lib/utils/cached";

const CACHE_TTL = 300; // 5 minutes

// 🔵 Get ALL orders (cached)
export async function getAllOrders(forceRefresh = false) {
  const key = "orders:all";

  if (forceRefresh) {
    await delKey(key);
    console.log("🗑️ All orders cache cleared");
  }

  const cached = await getCachedData(key);
  if (cached) {
    console.log("✅ [Redis] All orders loaded from cache");
    return cached;
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      restaurant: true,
      orderItems: {
        include: {
          orderItemAddOns: {
            include: { addOn: true },
          },
          menu: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("⚡ [Database] All orders loaded and cached");
  await setCachedData(key, orders, CACHE_TTL);

  return orders;
}

// 🔵 Get order BY ID (cached)
export async function getOrderById(orderId, forceRefresh = false) {
  const key = `order:${orderId}`;

  if (forceRefresh) {
    await delKey(key);
    console.log("🗑️ Order cache cleared:", orderId);
  }

  const cached = await getCachedData(key);
  if (cached) {
    console.log("✅ [Redis] Order loaded from cache:", orderId);
    return cached;
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      orderItems: {
        include: {
          menu: true,
          orderItemAddOns: {
            include: { addOn: true },
          },
        },
      },
    },
  });

  if (order) {
    console.log("⚡ [Database] Order loaded and cached:", orderId);
    await setCachedData(key, order, CACHE_TTL);
  }

  return order;
}

// 🔵 Get orders BY restaurant ID (cached)

export async function getOrdersByRestaurantId(
  restaurantId,
  todayOnly = false,
  forceRefresh = false
) {
  const key = todayOnly
    ? `orders:restaurant:${restaurantId}:today`
    : `orders:restaurant:${restaurantId}`;

  if (forceRefresh) {
    await delKey(key);
    console.log("🗑️ Restaurant orders cache cleared:", key);
  }

  const cached = await getCachedData(key);
  if (cached) {
    console.log("✅ [Redis] Restaurant orders loaded from cache:", key);
    return cached;
  }

  let whereCondition = { restaurantId };

  if (todayOnly) {
    // Calculate today's start and end times
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    whereCondition.createdAt = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  const orders = await prisma.order.findMany({
    where: whereCondition,
    include: {
      user: true,
      restaurant: true,
      orderItems: {
        include: {
          orderItemAddOns: {
            include: { addOn: true },
          },
          menu: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("⚡ [Database] Restaurant orders loaded and cached:", key);
  await setCachedData(key, orders, CACHE_TTL);

  return orders;
}
