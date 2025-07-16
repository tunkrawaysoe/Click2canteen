import UsersDisplay from "@/components/UsersDisplay/UsersDisplay";

export const metadata = {
  title: "Users Management",
  description: "View and manage all users",
};

// Mock data - replace with real data fetching
const mockUsers = [
  {
    id: "1001",
    name: "John Doe",
    avatar: "/avatars/user1.jpg",
    role: "Student",
    mealPlan: "Premium (5 meals/week)",
    balance: 1250,
    status: "Active",
  },
  {
    id: "1002",
    name: "Jane Smith",
    avatar: "/avatars/user2.jpg",
    role: "Staff",
    mealPlan: "Unlimited",
    balance: 0,
    status: "Active",
  },
  {
    id: "1003",
    name: "Admin User",
    avatar: "/avatars/user3.jpg",
    role: "Admin",
    mealPlan: "Custom",
    balance: 5000,
    status: "Active",
  },
  // Add more users as needed
];

export default function UsersPage() {
  return (
    <div className="users-management">
      <div className="page-header">
        <h1>Users Management</h1>
        <button className="add-user-button">+ Add New User</button>
      </div>

      <UsersDisplay users={mockUsers} />
    </div>
  );
}
