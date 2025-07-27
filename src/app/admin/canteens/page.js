import RestaurantsList from "@/components/restaurants/RestaurantLists";
import { getUser } from "@/lib/data/user/user";
import { hasPermission } from "@/lib/rbac";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function CanteensPage() {
  const user = await getUser();

  const canCreateCanteen = hasPermission(user, "create", "restaurant");

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        {canCreateCanteen && (
          <Link
            href="/admin/canteens/new"
            className="flex items-center gap-2 text-white px-4 py-2 rounded transition"
            style={{
              background: "linear-gradient(to bottom, #00022E, #001D51)",
            }}
          >
            <Plus size={18} />
            Add New Canteen
          </Link>
        )}
      </div>

      <RestaurantsList isAdmin={true} />
    </div>
  );
}
