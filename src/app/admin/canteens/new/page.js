import { addRestaurant } from "@/actions/restaurant";
import RestaurantForm from "@/components/restaurants/RestaurantForm";

export default function AddRestaurantPage() {
  return (
    <div>
      <RestaurantForm mode="add" onSubmit={addRestaurant} />
    </div>
  );
}
