"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Menu, X, ShoppingCart } from "lucide-react";
import Logo from "../../public/logo/logo.svg";
import background from "../../public/images/canteen.jpeg";

function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { user, isAuthenticated } = useKindeBrowserClient();
  console.log("total Quantity ", totalQuantity);

  useEffect(() => {
    async function fetchCart() {
      const userId = user?.id || "guest";

      try {
        const res = await fetch(
          `/api/cart?userId=${encodeURIComponent(userId)}`,
          {
            cache: "no-store",
          }
        );
        const cart = await res.json();
        const total = Array.isArray(cart)
          ? cart.reduce((sum, item) => sum + item.quantity, 0)
          : 0;
        setTotalQuantity(total);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    }

    fetchCart();

    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [user]);

  // Lock scroll when mobile menu is open
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

  const linkStyle = (path) =>
    `pb-1 border-b-2 transition-all duration-300 ${
      pathname === path
        ? "border-white text-white"
        : "border-transparent hover:border-purple-300 text-white"
    }`;

  const CartBadge = useMemo(() => {
    return totalQuantity > 0 ? (
      <span
        aria-label={`${totalQuantity} items in cart`}
        className="absolute -top-3 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full"
      >
        {totalQuantity}
      </span>
    ) : null;
  }, [totalQuantity]);

  return (
    <>
      <nav className="sticky top-0 z-50 shadow-md text-white bg-gradient-to-b from-[#00022E] to-[#001D51]">
        <div className="w-full max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left: Logo and nav links */}
          <div className="flex items-center gap-6 text-base">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center w-45 h-10"
            >
              <Image src={Logo} alt="Clicked2Canteen Logo" priority />
            </Link>

            <div className="hidden md:flex gap-6 ml-4 mt-3">
              <Link href="/canteens" className={linkStyle("/canteens")}>
                Canteens
              </Link>
              <Link href="/aboutus" className={linkStyle("/aboutus")}>
                About Us
              </Link>
              <Link
                href="/cart"
                className={`${linkStyle("/cart")} relative flex items-center`}
                aria-label="Cart"
              >
                {CartBadge}
                <ShoppingCart className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Right: Profile + Auth */}
          <div className="flex items-center gap-4 text-base">
            {/* Mobile cart icon */}
            <Link
              href="/cart"
              aria-label="Cart"
              className={`relative md:hidden flex items-center transition hover:text-gray-300 ${
                pathname === "/cart"
                  ? "text-white border-b-2 border-white"
                  : "border-transparent hover:border-purple-300"
              }`}
            >
              {CartBadge}
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {/* Desktop Profile + Auth */}
            <div className="hidden md:flex items-center gap-4 mt-3">
              <Link
                href="/profile"
                aria-label="Profile"
                className={`flex items-center justify-center gap-2 pb-1 border-b-2 transition-all duration-300 ${
                  pathname.startsWith("/profile")
                    ? "border-white text-white"
                    : "border-transparent hover:border-purple-300 text-white"
                }`}
              >
                <div className="relative rounded-full w-8 h-8 overflow-hidden flex items-center justify-center">
                  <Image
                    src={
                      isAuthenticated && user?.picture
                        ? user.picture
                        : background
                    }
                    alt="User Profile"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>

                <span className="text-white text-sm font-medium">
                  {isAuthenticated
                    ? `${user?.given_name} ${user?.family_name}`
                    : "Guest"}
                </span>
              </Link>

              {isAuthenticated ? (
                <LogoutLink>
                  <button className="bg-white text-[#00022E] px-4 py-1 rounded-lg font-medium cursor-pointer">
                    Logout
                  </button>
                </LogoutLink>
              ) : (
                <LoginLink postLoginRedirectURL="/">
                  <button className="bg-white text-[#00022E] px-4 py-1 rounded-lg font-medium cursor-pointer">
                    Login
                  </button>
                </LoginLink>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden text-white z-50"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#001D51] shadow-lg z-50 w-2/3 max-w-xs transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col px-6 py-6 space-y-6 text-white text-base">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={linkStyle("/")}
          >
            Home
          </Link>
          <Link
            href="/canteens"
            onClick={() => setMenuOpen(false)}
            className={linkStyle("/canteens")}
          >
            Canteens
          </Link>
          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className={linkStyle("/profile")}
          >
            Profile
          </Link>
          {isAuthenticated ? (
            <LogoutLink>
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-white text-[#00022E] w-full py-2 rounded-full font-medium"
              >
                Logout
              </button>
            </LogoutLink>
          ) : (
            <LoginLink>
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-white text-[#00022E] w-full py-2 rounded-full font-medium"
              >
                Login
              </button>
            </LoginLink>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Navbar);
