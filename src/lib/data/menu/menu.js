import prisma from "@/lib/prisma";
import { getCachedData, setCachedData, delKey } from "@/lib/utils/cached";

export async function getAllMenus(canteenId, forceRefresh = false) {
  const CACHE_KEY = `menu:all:${canteenId}`;
  const CACHE_TTL = 300;

  console.time("🕒 getAllMenus");
  if (forceRefresh) {
    await delKey(CACHE_KEY);
    console.log("🗑️ Cache cleared to force DB fetch");
  }

  const cached = await getCachedData(CACHE_KEY);
  if (cached) {
    console.log(`✅ [Redis] Menus loaded from cache ${canteenId}`);
    console.timeEnd("🕒 getAllMenus");
    return cached;
  }

  const menus = await prisma.menu.findMany({
    where: { restaurantId: canteenId },
    include: {
      addOns: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("⚡ [Database] Menus loaded from DB and cached");
  await setCachedData(CACHE_KEY, menus, CACHE_TTL);

  console.timeEnd("🕒 getAllMenus");
  return menus;
}



export async function getMenuWithAddons(menuId, forceRefresh = false) {
  const CACHE_KEY = `menu:single:${menuId}`;
  const CACHE_TTL = 300;

  console.time("🕒 getMenuWithAddons");

  if (forceRefresh) {
    await delKey(CACHE_KEY);
    console.log("🗑️ Cache cleared for menuId", menuId);
  }

  const cached = await getCachedData(CACHE_KEY);
  if (cached) {
    console.log(`✅ [Redis] Menu loaded from cache: ${menuId}`);
    console.timeEnd("🕒 getMenuWithAddons");
    return cached;
  }

  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
    include: {
      addOns: true,
    },
  });

  if (!menu) {
    console.timeEnd("🕒 getMenuWithAddons");
    throw new Error(`Menu not found for id: ${menuId}`);
  }

  console.log("⚡ [Database] Menu loaded from DB and cached");
  await setCachedData(CACHE_KEY, menu, CACHE_TTL);

  console.timeEnd("🕒 getMenuWithAddons");
  return menu;
}
