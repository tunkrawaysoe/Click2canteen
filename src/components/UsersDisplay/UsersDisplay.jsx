"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./UsersDisplay.module.css";

const UsersDisplay = ({ users }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className={styles.container}>
      {/* Desktop View */}
      <div className={styles.desktopView}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={`${styles.userInfo} ${styles.textColor}`}>
                    <Image
                      src={user.profileImage || "/default-avatar.svg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td className={styles.textColor}>{user.email}</td>
                <td className={styles.textColor}>-</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[user.role?.toLowerCase() || "user"]
                    }`}
                  >
                    {user.role || "User"}
                  </span>
                </td>
                <td className={styles.textColor}>
                  {user.restaurant?.name || "-"}
                </td>
                <td>
                  <div className={styles.desktopActions}>
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className={styles.editButton}
                    >
                      Edit
                    </Link>
                    <button className={styles.deleteButton}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className={styles.mobileView}>
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className={`${styles.userCard} ${
              expandedUserId === user.id ? styles.expanded : ""
            }`}
          >
            <div
              className={styles.cardHeader}
              onClick={() => toggleExpand(user.id)}
            >
              <Image
                src={user.profileImage || "/default-avatar.svg"}
                alt={user.name}
                width={48}
                height={48}
                className={styles.cardAvatar}
              />
              <div className={styles.cardTitle}>
                <h3>{user.name}</h3>
                <span
                  className={`${styles.badge} ${
                    styles[user.role?.toLowerCase() || "user"]
                  }`}
                >
                  {user.role || "User"}
                </span>
              </div>
              <span className={styles.expandIcon}>
                {expandedUserId === user.id ? "▲" : "▼"}
              </span>
            </div>

            {expandedUserId === user.id && (
              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
                  <span>Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Phone:</span>
                  <span>-</span>
                </div>
                <div className={styles.detailRow}>
                  <span>User Type:</span>
                  <span
                    className={`${styles.badge} ${
                      styles[user.role?.toLowerCase() || "user"]
                    }`}
                  >
                    {user.role || "User"}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Restaurant:</span>
                  <span>{user.restaurant?.name || "-"}</span>
                </div>
                <div className={styles.cardActions}>
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className={styles.editButton}
                  >
                    Edit
                  </Link>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Previous
        </button>

        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersDisplay;
