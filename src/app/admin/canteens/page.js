import Link from "next/link";
import RestaurantsList from "@/components/restaurants/RestaurantLists";
import { Plus } from "lucide-react"; // or any icon library you use
import BackButton from "@/components/buttons/BackButton";

export const metadata = {
  title: "Canteens Page",
  description: "View and manage all canteens",
};

export default function CanteensPage() {
  return (
    <div className="p-6">
      <div className="flex  justify-end mb-6">
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
      </div>

      <RestaurantsList isAdmin={true} />
    </div>
  );
}
