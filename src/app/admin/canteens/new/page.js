import { addRestaurant } from "@/actions/restaurant";
import BackButton from "@/components/buttons/BackButton";
import RestaurantForm from "@/components/restaurants/RestaurantForm";

export default function AddRestaurantPage() {
  return (
    <div>
      <RestaurantForm mode="add" onSubmit={addRestaurant} />
     
    </div>
  );
}
