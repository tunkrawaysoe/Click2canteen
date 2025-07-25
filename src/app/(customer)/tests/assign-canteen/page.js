AssignCanteenForm
import { assignCanteenToAdmin } from "@/actions/assignCanteenToAdmin";
import AssignCanteenForm from "@/components/form/AssignCanteenForm";
import { getAllRestaurants } from "@/lib/data/restaurant/restaurant";
import { getAdminUsers } from "@/lib/data/user/user";

export default async function AssignCanteenPage() {
  const admins = await getAdminUsers();
  const canteens = await getAllRestaurants();

  return (
    <div>
      <h1>Assign Canteens</h1>
      <AssignCanteenForm admins={admins} canteens={canteens} />
    </div>
  );
}
