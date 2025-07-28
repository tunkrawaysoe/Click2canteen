import Image from "next/image";
import Link from "next/link";
import pizza from "../../../public/images/pizza123.png";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { ClipboardList, CheckCircle, Truck } from "lucide-react";
import { getAllSpecialMenus } from "@/lib/data/menu/menu";

export const revalidate = 300;
export default async function HeroSection() {
  const specialMenus = await getAllSpecialMenus();

  return (
    <>
      <section
        style={{
          background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
        }}
        className="bg-white py-8 px-4 sm:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto flex  md:flex-row items-center">
          {/* Text Content for md+ */}
          <div className="hidden md:flex text-left w-[47%]">
            <div>
              <h1 className="text-4xl tracking-tight font-bold text-white">
                Mealtime Made Easy
              </h1>
              <h1 className="text-3xl tracking-tight font-bold text-white mb-4 pl-12 mt-5">
                We’ve Got You Covered !
              </h1>
              <p className="text-lg text-white mt-10 mb-8">
                Explore a variety of menus, discover daily specials, and enjoy
                quick, easy access to your favorite meals all in one place, made
                just for you.
              </p>
              <Link href="/canteens">
                <AnimatedButton />
              </Link>
            </div>
          </div>

          {/* Image for md+ */}
          <div className="hidden md:block flex-1 relative rounded-2xl  w-full h-165">
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
                      "linear-gradient(180deg, #000212 0%, #ffffff 100%)",
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
      {/* Special menu */}
      <section className="bg-[#FFF8E7] py-10 px-4 sm:px-8 lg:px-16 text-[#1d2941]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-4">
            Today's Specials
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10">
            Hand-picked meals cooked fresh, just for you!
          </p>

          {/* Scrollable Card Container */}
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
            {specialMenus.map((menu) => (
              <Link
                key={menu.id}
                href={`/canteens/${menu.restaurantId}/menu/${menu.id}`}
                className="min-w-[400px] bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 relative block"
              >
                {/* Special sentence banner */}
                <div className="absolute top-0 left-0 bg-red-500 text-white text-s font-bold px-3 py-1 rounded-br-2xl z-10">
                  ⭐ Special
                </div>

                {/* Image */}
                <div className="relative h-48 w-full rounded-t-3xl overflow-hidden">
                  <Image
                    src={
                      menu.imageUrl ||
                      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                    }
                    alt={menu.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 text-left">
                  <h3 className="text-xl font-semibold mb-2">{menu.name}</h3>
                  <p className="text-green-700 font-semibold mb-1">
                    MMK {menu.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {menu.description.length > 80
                      ? `${menu.description.slice(0, 80)}...`
                      : menu.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
        }}
        className="py-12 px-4 sm:px-8 lg:px-16"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-12 text-white">
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
              <h3 className="text-xl font-semibold mb-2 text-white">Browse</h3>
              <p className="text-[#d9d9d9]">
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
              <h3 className="text-xl font-semibold mb-2 text-white">
                Customize Your Order
              </h3>
              <p className="text-[#d9d9d9]">
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
              <h3 className="text-xl font-semibold mb-2 text-white">
                Checkout & Enjoy
              </h3>
              <p className="text-[#d9d9d9]">
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
