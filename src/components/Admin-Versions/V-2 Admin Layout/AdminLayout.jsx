"use client";

"use client";
import styles from "./AdminLayout.module.css";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", icon: "📊" },
    { name: "Orders", icon: "📦" },
    { name: "Products", icon: "🍔" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className={styles.layout}>
      {/* Top Bar */}
      <header className={styles.topbar}>
        <div className={styles.logoContainer}>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            ☰
          </button>
          <img src="/logo&icon/logo.svg" alt="Logo" className={styles.logo} />
        </div>
        <img
          src="/userProfilePhoto/userPhoto1.svg"
          alt="Profile"
          className={styles.profile}
        />
      </header>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Navigation Sidebar */}
        <nav
          className={`${styles.sidebar} ${isMobileNavOpen ? styles.open : ""}`}
        >
          {navLinks.map((link) => (
            <a key={link.name} href="#" className={styles.navLink}>
              <span className={styles.navIcon}>{link.icon}</span>
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
