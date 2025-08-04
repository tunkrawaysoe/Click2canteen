import prisma from "@/lib/prisma";
import { getCachedData, setCachedData, delKey } from "@/lib/utils/cached";

export async function getAllMenus(
  canteenId,
  category = null,
  forceRefresh = false
) {
  const categoryKey = category && category !== "All" ? `:${category}` : "";
  const CACHE_KEY = `menu:all:${canteenId}${categoryKey}`;
  const CACHE_TTL = 300; // 5 min

  const label = `🕒 getAllMenus:${canteenId}${categoryKey}`;
  console.time(label);

  if (forceRefresh) {
    await delKey(CACHE_KEY);
    console.log("🗑️ Cache cleared to force DB fetch");
  }

  const cached = await getCachedData(CACHE_KEY);
  if (cached) {
    console.log(`✅ [Redis] Menus loaded from cache ${CACHE_KEY}`);
    console.timeEnd(label);
    return cached;
  }

  // Only filter by category if it's not "All"
  const where = {
    restaurantId: canteenId,
    ...(category && category !== "All" ? { category } : {}),
  };

  const menus = await prisma.menu.findMany({
    where,
    include: { addOns: true },
    orderBy: { createdAt: "desc" },
  });

  console.log("⚡ [Database] Menus loaded from DB and cached");
  await setCachedData(CACHE_KEY, menus, CACHE_TTL);

  console.timeEnd(label);
  return menus;
}

export async function getMenuWithAddons(menuId, forceRefresh = false) {
  const CACHE_KEY = `menu:single:${menuId}`;
  const CACHE_TTL = 300;

  const label = `🕒 getMenuWithAddons:${menuId}`;
  console.time(label);

  if (forceRefresh) {
    await delKey(CACHE_KEY);
    console.log("🗑️ Cache cleared for menuId", menuId);
  }

  const cached = await getCachedData(CACHE_KEY);
  if (cached) {
    console.log(`✅ [Redis] Menu loaded from cache: ${menuId}`);
    console.timeEnd(label);
    return cached;
  }

  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
    include: {
      addOns: true,
    },
  });

  if (!menu) {
    console.timeEnd(label);
    throw new Error(`Menu not found for id: ${menuId}`);
  }

  console.log("⚡ [Database] Menu loaded from DB and cached");
  await setCachedData(CACHE_KEY, menu, CACHE_TTL);

  console.timeEnd(label);
  return menu;
}

export async function getAllSpecialMenus() {
  const CACHE_KEY = `menu:special:all`;
  const CACHE_TTL = 300; // cache for 5 minutes

  const label = `🕒 getAllSpecialMenus`;
  console.time(label);

  const cached = await getCachedData(CACHE_KEY);
  if (cached) {
    console.log(`✅ [Redis] All special menus loaded from cache`);
    console.timeEnd(label);
    return cached;
  }

  const specialMenus = await prisma.menu.findMany({
    where: {
      isSpecial: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  console.log("⚡ [Database] All special menus loaded from DB and cached");
  await setCachedData(CACHE_KEY, specialMenus, CACHE_TTL);

  console.timeEnd(label);
  return specialMenus;
}
