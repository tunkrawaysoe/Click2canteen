import UsersDisplay from "@/components/UsersDisplay/UsersDisplay";
import styles from "@/components/UsersDisplay/UsersDisplay.module.css";
import Link from "next/link";
import { getAllUsers } from "@/lib/data/user/user";
import { Button } from "@mui/material";
import BackButton from "@/components/buttons/BackButton";

export const metadata = {
  title: "Users Page",
  description: "View and manage all users",
};

export default async function UsersPage() {
  const users = await getAllUsers();
  if(!users) {
    return (
      <div>There is no users</div>
    )
  }

  return (
    <div className="usersPage">
      <div className={`${styles.pageHeader} ${styles.textColor}`}>
        
      </div>
      <UsersDisplay users={users} />
     
    </div>
    
  );
}
