import UsersDisplay from "@/components/UsersDisplay/UsersDisplay";
import styles from "@/components/UsersDisplay/UsersDisplay.module.css";
import Link from "next/link";
import { getAllUsers } from "@/lib/data/user/user";

export const metadata = {
  title: "Users Page",
  description: "View and manage all users",
};

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="usersPage">
      <div className={`${styles.pageHeader} ${styles.textColor}`}>
        <input
          type="text"
          placeholder="Search by name or email…"
          className={styles.searchInput}
        />
        <Link passHref href="/admin/users/create">
          <button className={styles.addUserButton}>+ Add Admin</button>
        </Link>
      </div>
      <UsersDisplay users={users} />
    </div>
  );
}
