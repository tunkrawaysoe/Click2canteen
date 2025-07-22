import { updateRestaurant } from "@/actions/restaurant";
import RestaurantForm from "@/components/RestaurantForm";
import { getRestaurantById } from "@/lib/data/restaurant/restaurant";

export default async function EditRestaurantPage({ params }) {
  const { canteenId } = await params;
  const restaurant = await getRestaurantById(canteenId);
  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <RestaurantForm
      mode="edit"
      initialData={restaurant}
      onSubmit={updateRestaurant}
    />
  );
}
