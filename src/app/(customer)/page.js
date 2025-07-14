"use client";

import Image from "next/image";
import Link from "next/link";
import pizza from "../../../public/images/newpiza.jpg";

import { ClipboardList, CheckCircle, Truck } from "lucide-react";
export default function HeroSection() {
  return (
    <>
      <section className="bg-white py-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex  md:flex-row items-center">
          {/* Text Content for md+ */}
          <div className="hidden md:flex text-left w-[47%] ">
            <div>
              <h1 className="text-4xl tracking-tight font-bold text-gray-800">
                Mealtime Made Easy
              </h1>
              <h1 className="text-3xl tracking-tight font-bold text-gray-800 mb-4 pl-6">
                We’ve Got You Covered !
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Explore a variety of menus, discover daily specials, and enjoy
                quick, easy access to your favorite meals all in one place, made
                just for you.
              </p>
              <Link href="/canteens">
                <button
                  style={{
                    background:
                      "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
                  }}
                  className="text-white px-6 py-3 rounded-2xl shadow transition duration-300 ease-in-out hover:brightness-110"
                >
                  Browse Menus
                </button>
              </Link>
            </div>
          </div>

          {/* Image for md+ */}
          <div className="hidden md:block flex-1 relative rounded-2xl  w-full h-160">
            <Image
              src={pizza}
              alt="Online Food Ordering"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile view: image with text overlay */}
          <div className="relative w-full h-[400px] rounded-2xl shadow-lg overflow-hidden md:hidden">
            <Image
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Online Food Ordering"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white z-10">
              <h1 className="text-3xl font-bold mb-3">
                Order Food Effortlessly with{" "}
                <span className="text-green-400">Clicked2Canteen</span>
              </h1>
              <p className="mb-6 max-w-xs">
                Skip the wait and order your favorite meals online. Fresh, fast,
                and convenient.
              </p>
              <Link href="/canteens">
                <button
                  style={{
                    background:
                      "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
                  }}
                  className="text-white px-6 py-3 rounded-2xl shadow transition duration-300 ease-in-out hover:brightness-110"
                >
                  Browse Menus
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
        }}
        className="py-16 px-4 sm:px-8 lg:px-16 text-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-12">Featured Menus</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Spicy Chicken Curry",
                description:
                  "A flavorful curry with tender chicken and spices.",
                image:
                  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
                price: "$8.99",
              },
              {
                id: 2,
                name: "Vegan Buddha Bowl",
                description:
                  "Healthy bowl packed with fresh veggies and grains.",
                image:
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                price: "$7.50",
              },
              {
                id: 3,
                name: "Classic Cheeseburger",
                description:
                  "Juicy beef patty with cheese, lettuce, and tomato.",
                image:
                  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
                price: "$9.99",
              },
            ].map((menu) => (
              <div
                key={menu.id}
                className="bg-white text-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={menu.image}
                    alt={menu.name}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-1">{menu.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">
                    {menu.price}
                  </p>
                  <p>{menu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="flex flex-col sm:flex-row justify-between gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center sm:w-1/3 px-4">
              <div
                className="rounded-full p-4 mb-4 inline-flex"
                style={{
                  background:
                    "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
                }}
              >
                <ClipboardList className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Browse Menus
              </h3>
              <p className="text-gray-600">
                Discover a wide variety of delicious meals from your favorite
                canteens.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center sm:w-1/3 px-4">
              <div
                className="rounded-full p-4 mb-4 inline-flex"
                style={{
                  background:
                    "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
                }}
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Customize Your Order
              </h3>
              <p className="text-gray-600">
                Select your dishes, add extras or special requests before
                placing your order.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center sm:w-1/3 px-4">
              <div
                className="rounded-full p-4 mb-4 inline-flex"
                style={{
                  background:
                    "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
                }}
              >
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Checkout & Enjoy
              </h3>
              <p className="text-gray-600">
                Pay securely and receive your order fast — delivered or ready
                for pickup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
