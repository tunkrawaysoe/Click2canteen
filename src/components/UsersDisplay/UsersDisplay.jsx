"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./UsersDisplay.module.css";

const UsersDisplay = ({ users }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className={styles.container}>
      {/* Desktop Table View */}
      <div className={styles.desktopView}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Meal Plan</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userInfo}>
                    <Image
                      src={user.avatar || "/default-avatar.svg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[user.role.toLowerCase()]
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>{user.mealPlan}</td>
                <td>₹{user.balance.toLocaleString("en-IN")}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[user.status.toLowerCase()]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.actionButton}
                    onClick={() => toggleExpand(user.id)}
                  >
                    {expandedUserId === user.id ? "▲" : "▼"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className={styles.mobileView}>
        {users.map((user) => (
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
                src={user.avatar || "/default-avatar.svg"}
                alt={user.name}
                width={48}
                height={48}
                className={styles.cardAvatar}
              />
              <div className={styles.cardTitle}>
                <h3>{user.name}</h3>
                <span
                  className={`${styles.badge} ${
                    styles[user.role.toLowerCase()]
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <span className={styles.expandIcon}>
                {expandedUserId === user.id ? "▲" : "▼"}
              </span>
            </div>

            {expandedUserId === user.id && (
              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
                  <span>Meal Plan:</span>
                  <span>{user.mealPlan}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Balance:</span>
                  <span>₹{user.balance.toLocaleString("en-IN")}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Status:</span>
                  <span
                    className={`${styles.status} ${
                      styles[user.status.toLowerCase()]
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.editButton}>Edit</button>
                  <button className={styles.viewButton}>View Details</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersDisplay;
