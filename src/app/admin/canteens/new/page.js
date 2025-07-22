import { addRestaurant } from "@/actions/restaurant";
import BackButton from "@/components/BackButton";
import RestaurantForm from "@/components/RestaurantForm";

export default function AddRestaurantPage() {
  return (
    <div>
      <RestaurantForm mode="add" onSubmit={addRestaurant} />
     
    </div>
  );
}
