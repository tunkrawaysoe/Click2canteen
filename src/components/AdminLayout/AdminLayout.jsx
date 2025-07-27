"use client";

import styles from "./AdminLayout.module.css";
import { useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { hasPermission } from "@/lib/rbac";

export default function AdminLayout({ children, user }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // Example: if you want to add an isAuthenticated flag based on user prop
  const isAuthenticated = Boolean(user);

  // Your nav links with permissions
  const navLinks = [
    { name: "Users", href: "/admin/users", action: "read", resource: "user" },
    {
      name: "Canteens",
      href: "/admin/canteens",
      action: "read",
      resource: "restaurant",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      action: "read",
      resource: "order",
    },
    {
      name: "Order History",
      href: "/admin/orderhistory",
      action: "read",
      resource: "order",
    },
  ];

  const getIconByName = (name) => {
    switch (name) {
      case "Users":
        return (
          <Image width={24} height={24} src="/navicons/users.png" alt="Users" />
        );
      case "Canteens":
        return (
          <Image
            width={24}
            height={24}
            src="/navicons/canteens.png"
            alt="Canteens"
          />
        );
      case "Orders":
        return (
          <Image
            width={24}
            height={24}
            src="/navicons/orders.png"
            alt="Orders"
          />
        );
      case "Order History":
        return (
          <Image
            width={24}
            height={24}
            src="/navicons/orderhistory.png"
            alt="Order History"
          />
        );
      default:
        return null;
    }
  };

  // Dummy logout function since you don't have useKindeBrowserClient here
  const logout = () => {
    // Implement logout or redirect to logout page
    console.log("Logout clicked");
  };

  return (
    <div className={styles.layout}>
      {/* Top Bar */}
      <header className={styles.topbar}>
        <div className={styles.logoContainer}>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label="Toggle navigation"
          >
            <Image
              width={24}
              height={24}
              src="/navicons/hamburger.png"
              alt="Hamburger"
            />
          </button>
          <Link href={"/admin"} onClick={() => setIsMobileNavOpen(false)}>
            <Image
              src="/logo/logo.svg"
              alt="Logo"
              width={100}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* User Profile + Name + Logout */}
        <div
          className={styles.profileContainer}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {isAuthenticated && user ? (
            <>
              <Image
                src={user.picture}
                alt={user.name || "Profile"}
                width={40}
                height={40}
                className={styles.profile}
              />
              <span>
                {user.given_name
                  ? `${user.given_name} ${user.family_name || ""}`.trim()
                  : user.name || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setIsMobileNavOpen(false);
                }}
                className="ml-4 px-3 py-1 bg-white text-black border border-black hover:bg-black hover:text-white rounded transition"
                aria-label="Logout"
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileNavOpen(false)}
              className="ml-4 px-3 py-1 bg-white text-black border border-black hover:bg-black hover:text-white rounded transition"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Navigation Sidebar */}
        <nav
          className={`${styles.sidebar} ${isMobileNavOpen ? styles.open : ""}`}
          aria-label="Main Navigation"
        >
          {navLinks
            .filter((link) =>
              hasPermission(
                user,
                link.action,
                link.resource,
                user?.restaurantId
              )
            )
            .map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={`${styles.navLink} ${
                  pathname.startsWith(link.href) ? styles.active : ""
                }`}
              >
                <span className={styles.navIcon}>
                  {getIconByName(link.name)}
                </span>
                <span className={styles.navText}>{link.name}</span>
              </Link>
            ))}
        </nav>

        {/* Dynamic Content */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
