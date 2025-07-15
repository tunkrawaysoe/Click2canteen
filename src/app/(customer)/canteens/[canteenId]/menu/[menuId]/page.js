import { getMenuWithAddons } from "@/lib/data/menu/menu";
import MenuDetailClient from "@/components/MenuDetailClient";
import { getCartAction } from "@/actions/cart";
import prisma from "@/lib/prisma";

export default async function MenuDetailPage({ params }) {
  const { menuId } = await params;
  const userId = "guest";
  console.log("menu id de",menuId);
  // Get current cart
  const cart = await getCartAction(userId);
  console.log("raw", cart);

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

  return <MenuDetailClient menu={menu} cart={cartDetails} />;
}
