"use client";

import Link from "next/link";
import { useState } from "react";

// Dummy menu items with images
const dummyMenuItems = [
  {
    id: "menu1",
    name: "Grilled Chicken Burger",
    price: 4500.0,
    category: "MAIN",
    restaurantId: "r1",
    image:
      "https://images.unsplash.com/photo-1606755962773-bf28c3e5c6e2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "menu2",
    name: "French Fries",
    price: 2000.0,
    category: "SNACK",
    restaurantId: "r1",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "menu3",
    name: "Mango Smoothie",
    price: 2500.0,
    category: "DRINK",
    restaurantId: "r1",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "menu4",
    name: "Chocolate Lava Cake",
    price: 3000.0,
    category: "DESSERT",
    restaurantId: "r2",
    image:
      "https://images.unsplash.com/photo-1614707267530-61e87b94f9b1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "menu5",
    name: "Caesar Salad",
    price: 3500.0,
    category: "APPETIZER",
    restaurantId: "r2",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
  },
];

export default function MenuCard() {
  const [menus] = useState(dummyMenuItems);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🍽️ Canteen Menu</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menus.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <span className="text-green-600 font-bold">
                  MMK {item.price.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-500">Category: {item.category}</p>
              <button className="mt-2 px-3 py-1 bg-amber-500 text-white rounded-full text-sm hover:bg-amber-600">
                <Link href={`/${item.id}`}>Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
