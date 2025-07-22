"use client";

import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteRestaurant } from "@/actions/restaurant"; // this has "use server" at top

export default function DeleteRestaurantButton({ restaurantId }) {
  const router = useRouter();

  async function onClick() {
    await deleteRestaurant(restaurantId); // call imported server action here
    router.refresh(); // refresh server components after deletion
  }

  return (
    <button
      onClick={onClick}
      aria-label="Delete restaurant"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
      }}
    >
      <DeleteIcon color="error" />
    </button>
  );
}
