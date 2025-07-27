import { updateMenuWithAddOns } from "@/actions/action";
import MenuFormClient from "@/components/form/MenuFormClient";
import { getMenuWithAddons } from "@/lib/data/menu/menu";

export default async function MenuEdit({ params }) {
  const { menuId } = await params;

  const menu = await getMenuWithAddons(menuId);

  if (!menu) return <div>Menu not found</div>;

  return (
    <div>
      <MenuFormClient
        defaultValues={{
          id: menu.id,
          name: menu.name,
          price: menu.price,
          description: menu.description || "",
          category: menu.category,
          isSpecial: menu.isSpecial,
          isActive: menu.isActive,
          addOns: menu.addOns || [],
          image: menu.imageUrl || "",
        }}
        canteenId={menu.restaurantId}
        submitLabel="Update Menu"
        onSubmit={updateMenuWithAddOns}
      />
    </div>
  );
}
