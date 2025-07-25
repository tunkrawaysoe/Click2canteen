import { getMenuWithAddons } from "@/lib/data/menu/menu";
import { updateMenuWithAddOns } from "@/actions/action";
import MenuFormClient from "@/components/form/MenuFormClient";

export default async function AddMenuPage({ params }) {
  const { menuid } = params;

  const existingMenuObject = await getMenuWithAddons(menuid);
  const canteenId = existingMenuObject.restaurantId;

  return (
    <MenuFormClient
      canteenId={canteenId}
      menu={existingMenuObject}
      onSubmit={updateMenuWithAddOns}
      submitLabel="Update Menu"
    />
  );
}
