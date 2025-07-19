import { getCartAction } from "@/actions/cart";
import Link from "next/link";
import CartListClient from "./app/cart/CartListClient";
import prisma from "@/lib/prisma";
import { Restaurant } from "@mui/icons-material";
import { getUserProfile } from "@/lib/data/user/user";
export default async function CartPage() {
 const user = await getUserProfile()
 const userId = user?.id  || "guest";
  const cart = await getCartAction(userId);

  const menuDetails = await Promise.all(
    cart.map(async (item) => {
      const menu = await prisma.menu.findUnique({
        where: { id: item.menuId },
        include: { addOns: true, restaurant: true },
      });
      return { ...item, menu };
    })
  );
  console.log("Menudetails",menuDetails)

  return (
    <div className="max-w-4xl mx-auto p-6">
      {menuDetails.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-700 py-50 gap-3">
          <div className="text-6xl">🛒</div>
          <h2 className="text-lg font-semibold">Your cart is empty</h2>
          <p className="text-sm">Looks like you haven’t added anything yet.</p>

          <Link
            href="/canteens"
            className="mt-4 inline-block px-5 py-2.5 bg-blue-900 text-white rounded-md hover:bg-blue-900 transition"
          >
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <CartListClient cartItems={menuDetails} userId={userId} />
      )}
    </div>
  );
}
