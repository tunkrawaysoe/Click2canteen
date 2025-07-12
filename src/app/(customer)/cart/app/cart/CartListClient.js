"use client";

import { removeFromCartAction, updateCartQuantity } from "@/actions/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartListClient({ cartItems, userId }) {
  const router = useRouter();
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

  async function handleRemove(menuId) {
    await removeFromCartAction(userId, menuId);
    router.refresh();
  }

  async function handleQuantityChange(menuId, value) {
    const quantity = parseInt(value);
    if (quantity > 0) {
      await updateCartQuantity(userId, menuId, quantity);
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item, idx) => {
        if (!item.menu) {
          return (
            <p key={idx} className="text-red-500">
              Menu not found (ID: {item.menuId})
            </p>
          );
        }

        const itemAddons = item.addOns
          .map((id) => item.menu.addOns.find((a) => a.id === id))
          .filter(Boolean);

        const basePrice = item.menu.price;
        const addonTotal = itemAddons.reduce(
          (sum, a) => sum + (a?.price || 0),
          0
        );
        const itemPrice = basePrice + addonTotal;

        return (
          <div
            key={item.menuId + idx}
            className="flex flex-col md:flex-row gap-2 md:h-[250] bg-white shadow-2xl rounded-lg overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full md:w-[250px] h-60 md:h-auto flex-shrink-0">
              <Image
                src={item.menu.imageUrl || defaultImageUrl}
                alt={item.menu.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col justify-between relative">
              {/* Delete Button */}
              <button
                onClick={() => handleRemove(item.menuId)}
                className="absolute top-2  cursor-pointer right-2 text-red-500 hover:text-red-600 transition"
              >
                <Trash2 size={20} strokeWidth={2} />
              </button>

              {/* Top Section */}
              <div className="space-y-2">
                <h2 className="font-semibold text-lg truncate">
                  {item.menu.name}
                </h2>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`qty-${item.menuId}`}
                    className="text-sm text-gray-600"
                  >
                    Quantity:
                  </label>
                  <input
                    id={`qty-${item.menuId}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.menuId, e.target.value)
                    }
                    className="w-16 border px-2 py-1 rounded text-sm"
                  />
                </div>

                {/* Add-ons */}
                {itemAddons.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Add-ons:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {itemAddons.map((addon) => (
                        <span
                          key={addon.id}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap truncate max-w-[200px]"
                        >
                          {addon.name} (+{addon.price.toLocaleString()} MMK)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Regular price:</span>
                  <span>{basePrice.toLocaleString()} MMK</span>
                </div>

                {addonTotal > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Add-ons:</span>
                    <span>{addonTotal.toLocaleString()} MMK</span>
                  </div>
                )}

                <div className="flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span>
                    {(itemPrice * item.quantity).toLocaleString()} MMK
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
