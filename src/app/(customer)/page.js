import Image from "next/image";
import Link from "next/link";
import pizza from "../../../public/images/pizza123.png";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { ClipboardList, CheckCircle, Truck } from "lucide-react";
import { getAllSpecialMenus } from "@/lib/data/menu/menu";
import SpecialsSection from "@/components/menu/SpecialSection";
import { getUser } from "@/lib/data/user/user";
import { redirect } from "next/navigation";

export const revalidate = 300;
export default async function HeroSection() {
  const specialMenus = await getAllSpecialMenus();
  const user = await getUser();

  if (user.role === "ADMIN" || user.role === "SYSTEM_ADMIN") {
    redirect("/admin");
  }

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
                <span className="bg-gradient-to-r from-blue-600 to-sky-300 bg-clip-text text-transparent">
                  Clicked2Canteen
                </span>
              </h1>
              <p className="mb-6 max-w-xs">
                Skip the wait and order your favorite meals online. Fresh, fast,
                and convenient.
              </p>
              <Link href="/canteens">
                <button
                  style={{
                    background:
                      "linear-gradient(180deg, #0F172A 0%, #1E40AF 100%)",
                  }}
                  className="text-white px-6 py-3 rounded-2xl shadow transition duration-300 ease-in-out hover:brightness-110"
                >
                  Browse Canteens
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Special menu */}
      <SpecialsSection specialMenus={specialMenus} />

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
