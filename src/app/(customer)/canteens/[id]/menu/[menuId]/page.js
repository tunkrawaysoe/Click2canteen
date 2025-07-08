"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const dummyMenu = {
  id: "1",
  title: "ကြက်သားကြော်ဘားဂါ",
  description: "ချဉ်စပ်တဲ့ မျက်နှာသစ်သီးနဲ့ ကြက်သားကြော်တင်ထားသည်။",
  price: 3200,
  imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
  addOns: [
    { id: "a1", name: "Cheese Slice", price: 500 },
    { id: "a2", name: "Extra Chicken", price: 1000 },
    { id: "a3", name: "Coke", price: 800 },
  ],
};

export default function MenuDetailsPage({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const router = useRouter();

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedAddOnTotal = dummyMenu.addOns
    .filter((addOn) => selectedAddOns.includes(addOn.id))
    .reduce((sum, addOn) => sum + addOn.price, 0);

  const totalPrice = (dummyMenu.price + selectedAddOnTotal) * quantity;

  const handleAddToCart = () => {
    const payload = {
      canteenId: params.canteenId,
      menuId: dummyMenu.id,
      quantity,
      addOns: selectedAddOns,
    };

    console.log("🛒 Add to Cart Payload:", payload);
    alert("Added to cart!");
    router.push(`/canteens/${params.canteenId}`);
  };

  return (
    <div className="max-w-[420px] mx-auto p-4">
      <div className="bg-gray-100 rounded-2xl shadow-lg p-4">
        {/* Image */}
        <div className="relative w-full h-[260px] rounded-xl overflow-hidden mb-4">
          <Image
            src={dummyMenu.imageUrl}
            alt={dummyMenu.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{dummyMenu.title}</h1>
          <p className="text-sm text-gray-600">{dummyMenu.description}</p>

          <p className="text-lg font-semibold text-green-700">
            Base Price: MMK {dummyMenu.price.toLocaleString()}
          </p>

          {/* Quantity Selector */}
          <div>
            <label className="block font-semibold mb-1">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>

          {/* Add-ons */}
          <div>
            <label className="block font-semibold mb-2">Add-ons:</label>
            <div className="space-y-1">
              {dummyMenu.addOns.map((addOn) => (
                <label key={addOn.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() => toggleAddOn(addOn.id)}
                  />
                  <span>
                    {addOn.name} (+MMK {addOn.price.toLocaleString()})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Total Price */}
          <p className="text-md font-medium text-gray-800">
            Total: <span className="font-bold">MMK {totalPrice.toLocaleString()}</span>
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={quantity < 1}
            className={`mt-2 w-full py-2 rounded text-white transition ${
              quantity < 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-green-700"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
