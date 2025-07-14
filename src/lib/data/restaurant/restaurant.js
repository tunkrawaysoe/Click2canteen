import prisma from "@/lib/prisma";
import { delKey, getCachedData, setCachedData } from "@/lib/utils/cached";

const CACHE_KEY = "restaurants:all";
const CACHE_TTL = 300;

export async function getAllRestaurants(forceRefresh = false) {
  console.time("🕒 getAllRestaurants");

  if (forceRefresh) {
    await delKey(CACHE_KEY);
    console.log("🗑️ Cache cleared to force DB fetch");
  }

  const cached = await getCachedData(CACHE_KEY);
  if (cached) {
    console.log("✅ [Redis] Restaurants loaded from cache");
    console.timeEnd("🕒 getAllRestaurants");
    return cached;
  }

  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
  });

  console.log("⚡ [Database] Restaurants loaded from DB and cached");
  await setCachedData(CACHE_KEY, restaurants, CACHE_TTL);

  console.timeEnd("🕒 getAllRestaurants");
  return restaurants;
}
export async function getRestaurantById(restaurantId) {
  const key = `restaurant:${restaurantId}`;
  const cached = await getCachedData(key);
  if (cached) return cached;

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (restaurant) {
    await setCachedData(key, restaurant, CACHE_TTL);
  }

  return restaurant;
}
