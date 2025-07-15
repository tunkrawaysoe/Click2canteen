"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import Logo from "../../public/logo&icon/click2canteenLogo(1).svg";
import background from "../../public/images/canteen.jpeg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // 🛒 Fetch cart quantity from API
 useEffect(() => {
  async function fetchCart() {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const cart = await res.json();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setTotalQuantity(total);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }

  // Initial load
  fetchCart();

  // 🧠 Listen for custom cartUpdated event
  const handleCartUpdate = () => fetchCart();
  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
  };
}, []);


  // 🚫 Lock scroll when menu is open
  useEffect(() => {
    const html = document.documentElement;
    const scrollBarWidth = window.innerWidth - html.clientWidth;

    if (menuOpen) {
      html.style.overflow = "hidden";
      html.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      html.style.overflow = "";
      html.style.paddingRight = "";
    }

    return () => {
      html.style.overflow = "";
      html.style.paddingRight = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="sticky top-0 z-50 shadow-md text-white bg-gradient-to-b from-[#00022E] to-[#001D51]">
        <div className="w-full max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left: Logo and nav links */}
          <div className="flex items-center gap-6 text-base">
            <div className="relative w-45 h-10 backdrop-blur-3xl">
              <Link href="/" className="flex items-center whitespace-nowrap">
                <Image src={Logo} alt="Clicked2Canteen Logo" priority />
              </Link>
            </div>

            <div className="hidden md:flex gap-6 ml-4">
              <Link href="/canteens" className="hover:text-gray-300 transition">
                Canteens
              </Link>
              <Link href="/aboutus" className="hover:text-gray-300 transition">
                About Us
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center hover:text-gray-300 transition"
              >
                {totalQuantity > 0 && (
                  <span className="absolute -top-3 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full">
                    {totalQuantity}
                  </span>
                )}
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Right: Cart + Profile + Toggle */}
          <div className="flex items-center gap-4 text-base">
            {/* Mobile cart icon */}
            <Link
              href="/cart"
              className="relative md:hidden flex items-center hover:text-gray-300 transition"
            >
              {totalQuantity > 0 && (
                <span className="absolute -top-3 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {/* Profile + Login (Desktop only) */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 hover:text-blue-300"
              >
                <div className="relative rounded-full size-8 overflow-hidden">
                  <Image
                    src={background}
                    alt="User Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium">Guest</span>
              </Link>

              <button className="bg-white text-[#00022E] px-4 py-1 rounded-lg font-medium">
                Login
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden text-white z-50">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer Panel for Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#001D51] shadow-lg z-50 w-2/3 max-w-xs transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col px-6 py-6 space-y-6 text-white text-base">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/tests/restaurants" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
            Restaurants
          </Link>
          <Link href="/profile" onClick={() => setMenuOpen(false)} className="hover:text-gray-300">
            Profile
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="bg-white text-[#00022E] w-full py-2 rounded-full font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
