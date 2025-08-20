import { updateRestaurant } from "@/actions/restaurant";
import BackButton from "@/components/buttons/BackButton";
import RestaurantForm from "@/components/restaurants/RestaurantForm";
import { getRestaurantById } from "@/lib/data/restaurant/restaurant";

export default async function EditRestaurantPage({ params }) {
  const { canteenId } = await params;
  const restaurant = await getRestaurantById(canteenId);
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div>
      <BackButton/>
    <RestaurantForm
      mode="edit"
      initialData={restaurant}
      onSubmit={updateRestaurant}
    />
    </div>
  );
}
