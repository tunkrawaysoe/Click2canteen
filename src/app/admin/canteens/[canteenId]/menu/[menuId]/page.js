import { Suspense } from "react";
import { Box, Stack, Skeleton } from "@mui/material";
import { getMenuWithAddons } from "@/lib/data/menu/menu";
import MenuDetailClient from "@/components/menu/MenuDetailClient";
import { getCartAction } from "@/actions/cart";
import prisma from "@/lib/prisma";
import { getUserProfile } from "@/lib/data/user/user";

export default async function MenuDetailPage({ params }) {
  const { menuId } = await params;
  const user = await getUserProfile()
  const userId = user?.id;


  // Get current cart
  const cart = await getCartAction(userId);

  // Get full details for each menu item in cart
  const cartDetails = await Promise.all(
    cart.map(async (item) => {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menuId },
        include: { restaurant: true, addOns: true },
      });

      return {
        ...item,
        menu,
      };
    })
  );

  // Get menu detail for current menu
  const menu = await getMenuWithAddons(menuId);

  return (
    <Suspense fallback={<MenuDetailFallback />}>
      <MenuDetailClient menu={menu} cart={cartDetails} userId={userId} />
    </Suspense>
  );
}

function MenuDetailFallback() {
  return (
    <div className="max-w-xl mx-auto p-4 mt-8 border rounded-md shadow-md animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-72 rounded-lg bg-gray-300 mb-6"></div>

      {/* Title placeholder */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

      {/* Description placeholder */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>

      {/* Price placeholder */}
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-6"></div>

      {/* Quantity label + input placeholder */}
      <div className="mb-6">
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>

      {/* Add-ons placeholder (if any) */}
      <div className="mb-6">
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-300 rounded w-3/4"></div>
          ))}
        </div>
      </div>

      {/* Button placeholder */}
      <div className="h-10 bg-gray-400 rounded cursor-wait"></div>
    </div>
  );
}
