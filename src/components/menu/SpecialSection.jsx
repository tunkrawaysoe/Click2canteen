"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SpecialsSection({ specialMenus }) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isMobile) return;

    let direction = 1;
    const scrollStep = 0.5;
    const scrollDelay = 16;

    const scrollInterval = setInterval(() => {
      if (isHovered) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll) direction = -1;
      if (container.scrollLeft <= 0) direction = 1;

      container.scrollLeft += scrollStep * direction;
    }, scrollDelay);

    return () => clearInterval(scrollInterval);
  }, [isHovered, isMobile]);

  return (
    <section className="bg-[#FFF8E7] py-10 px-4 sm:px-8 lg:px-16 text-[#1d2941]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-4">
          Today's Specials
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Hand-picked meals cooked fresh, just for you!
        </p>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${
            isMobile
              ? "flex flex-col space-y-6"
              : "flex overflow-x-auto space-x-6 scroll-smooth scrollbar-hide pb-4"
          }`}
          role="region"
          aria-label="Today's specials menu carousel"
          tabIndex={0}
        >
          {specialMenus.map((menu, i) => (
            <motion.div
              key={menu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-full sm:w-[400px]"
            >
              <Link
                href={`/canteens/${menu.restaurantId}/menu/${menu.id}`}
                className="w-full sm:w-[400px] bg-white shadow-md hover:shadow-xl transition duration-300 relative block rounded-lg h-full"
              >
                {/* Special badge */}
                <div
                  className="absolute top-5 right-5 z-10 select-none"
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    userSelect: "none",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Special
                </div>

                {/* Menu image */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-lg">
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
                  <h3 className="text-xl font-semibold mb-1">{menu.name}</h3>

                  {/* Restaurant link */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/canteens/${menu.restaurantId}/menu`);
                    }}
                    className="flex items-center space-x-3 text-sm text-gray-600 mb-2 hover:underline select-none cursor-pointer"
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        router.push(`/canteens/${menu.restaurantId}/menu`);
                      }
                    }}
                    aria-label={`Go to ${menu.restaurant?.name} menu`}
                  >
                    <div className="relative w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden border border-gray-300">
                      <Image
                        src={
                          menu.restaurant?.imageUrl ||
                          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=64&q=80"
                        }
                        alt={`${menu.restaurant?.name} logo`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <span>{menu.restaurant?.name}</span>
                  </div>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
