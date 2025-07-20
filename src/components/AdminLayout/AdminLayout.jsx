"use client";

import styles from "./AdminLayout.module.css";
import { useState } from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function AdminLayout({ children }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useKindeBrowserClient();

  const navLinks = [
    { name: "Users", href: "/admin/users" },
    { name: "Canteens", href: "/admin/canteens" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Order History", href: "/admin/orderhistory" },
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

  return (
    <div className={styles.layout}>
      {/* Top Bar */}
      <header className={styles.topbar}>
        <div className={styles.logoContainer}>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            <Image
              width={24}
              height={24}
              src="/navicons/hamburger.png"
              alt="Hamburger"
            />
          </button>
          <img src="/logo/logo.svg" alt="Logo" className={styles.logo} />
        </div>

        {/* User Profile + Name */}
        <div className={styles.profileContainer}>
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
            </>
          ) : (
            <>
              <img
                src="/userProfilePhoto/userPhoto1.svg"
                alt="Profile"
                className={styles.profile}
              />
              <span>Guest</span>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Navigation Sidebar */}
        <nav
          className={`${styles.sidebar} ${isMobileNavOpen ? styles.open : ""}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileNavOpen(false)}
              className={`${styles.navLink} ${
                pathname.startsWith(link.href) ? styles.active : ""
              }`}
            >
              <span className={styles.navIcon}>{getIconByName(link.name)}</span>
              <span className={styles.navText}>{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Dynamic Content */}
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
