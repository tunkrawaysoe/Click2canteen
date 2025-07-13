import { addMenuWithAddOns } from "@/actions/action";
import MenuFormClient from "@/components/MenuFormClient";


export default async function AddMenuPage({ params }) {
  const { canteenId } = await params;
  return (
    <MenuFormClient
      canteenId={canteenId}
      onSubmit={addMenuWithAddOns}
      submitLabel="Add Menu"
    />
  );
}
