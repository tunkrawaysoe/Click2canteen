import Image from "next/image";
import Link from "next/link";
import pizza from "../../../public/images/pizza123.png";
import AnimatedButton from "@/components/buttons/AnimatedButton";
import { ClipboardList, CheckCircle, Truck } from "lucide-react";
import { getUser } from "@/lib/data/user/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SpecialsSkeleton from "@/components/menu/SpecialsSkeleton";
import SpecialsSectionWrapper from "@/components/menu/SpecialsSectionWrapper";

export const revalidate = 300;

export default async function HeroSection() {
  const user = await getUser();

  if (user.role === "ADMIN" || user.role === "SYSTEM_ADMIN") {
    redirect("/admin");
  }

  return (
    <>
      {/* ---------------- Hero Section ---------------- */}
      <section
        style={{
          background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
        }}
        className="bg-white py-8 px-4 sm:px-8 lg:px-16"
      >
        <div className="max-w-7xl mx-auto flex md:flex-row items-center">
          {/* Left Text */}
          <div className="hidden md:flex text-left w-[47%]">
            <div>
              <h1 className="text-4xl tracking-tight font-bold text-white">
                Mealtime Made Easy
              </h1>
              <h1 className="text-3xl tracking-tight font-bold text-white mb-4 pl-12 mt-5">
                We’ve Got You Covered!
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

          {/* Right Image */}
          <div className="hidden md:block flex-1 relative rounded-2xl w-full h-165">
            <Image
              src={pizza}
              alt="Online Food Ordering"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile View */}
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

      {/* ---------------- Specials Section ---------------- */}
      <Suspense fallback={<SpecialsSkeleton />}>
        <SpecialsSectionWrapper />
      </Suspense>

      {/* ---------------- How It Works ---------------- */}
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
            <Step
              icon={<ClipboardList className="h-10 w-10 text-white" />}
              title="Browse"
              text="Discover a wide variety of delicious meals from your favorite canteens."
            />
            <Step
              icon={<CheckCircle className="h-10 w-10 text-white" />}
              title="Customize Your Order"
              text="Select your dishes, add extras or special requests before placing your order."
            />
            <Step
              icon={<Truck className="h-10 w-10 text-white" />}
              title="Checkout & Enjoy"
              text="Pay securely and receive your order fast — delivered or ready for pickup."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center text-center sm:w-1/3 px-4">
      <div
        className="rounded-full p-4 mb-4 inline-flex"
        style={{
          background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
        }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-[#d9d9d9]">{text}</p>
    </div>
  );
}
