import MenuCard from "@/components/menu/MenuCard";
import { getAllMenus } from "@/lib/data/menu/menu";

export default async function Menu({ params }) {
  const { canteenId } = await params;
  console.log("canten",canteenId)
  const menus = await getAllMenus(canteenId);
  console.log(menus)

  return (
    <div className="w-[95%] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Menu for Canteen {canteenId}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {menus.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description || ""}
            isActive={item.isActive}
            price={`MMK ${item.price.toLocaleString()}`}
            imageUrl={
              item.imageUrl // fallback image
            }
            canteenId={canteenId}
          />
        ))}
      </div>
    </div>
  );
}
