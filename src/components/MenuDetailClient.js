"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { addToCartAction } from "@/actions/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MenuDetailClient({ menu, cart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const userId = "guest";
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 4000); // auto-hide after 4s
  };

  const handleAddOnChange = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = async () => {
    try {
      if (cart?.length > 0) {
        const existingRestaurantId = cart[0].menu?.restaurantId;

        if (
          existingRestaurantId &&
          existingRestaurantId !== menu.restaurantId
        ) {
          showError("You can only add items from one restaurant at a time.");
          return;
        }
      }

      await addToCartAction(userId, menu.id, quantity, selectedAddons);
      window.dispatchEvent(new Event("cartUpdated"));
      router.back();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      showError("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="relative w-full h-80">
        <Image
          src={menu.image || defaultImageUrl}
          alt={menu.name}
          fill
          className="rounded object-cover"
        />
      </div>

      <h1 className="text-2xl font-bold mt-4">{menu.name}</h1>

      <Link href="/cart" className="text-sm font-medium text-blue-600">
        🛒 Cart
      </Link>

      <p className="text-gray-700 mt-2 text-justify leading-relaxed">
        {menu.description}
      </p>

      <p className="text-lg font-semibold mt-2">Price: {menu.price} MMK</p>

      <div className="mt-4">
        <label className="font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-1 ml-2 w-16"
        />
      </div>

      {menu.addOns?.length > 0 && (
        <div className="mt-4">
          <label className="font-medium">Add-ons</label>
          <div className="flex flex-col gap-2 mt-2">
            {menu.addOns.map((addon) => (
              <label key={addon.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={addon.id}
                  onChange={() => handleAddOnChange(addon.id)}
                />
                <span>
                  {addon.name} (+{addon.price} MMK)
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className={`mt-6 px-4 py-2 rounded text-white ${
          isPending ? "bg-gray-500" : "bg-black"
        }`}
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
