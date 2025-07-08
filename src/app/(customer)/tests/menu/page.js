import MenuCard from "@/components/MenuCard";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function Menu({ params }) {
  const { canteenId } = params;
  console.log("canteenId", canteenId)

  // Fetch real menu items for this restaurant/canteen
  const menus = await prisma.menu.findMany({
    where: { restaurantId: canteenId },
    include: {
      addOns: true, // if you want add-ons in the future
    },
  });
  console.log(menus)

  return (
    <div className="w-5/6 mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Menu for Canteen {canteenId}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {menus.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description || ""}
            price={`MMK ${item.price.toLocaleString()}`}
            imageUrl={
              item.imageUrl ||
              "https://images.unsplash.com/photo-1551183053-bf91a1d81141" // fallback image
            }
            canteenId={canteenId}
          />
        ))}
      </div>
    </div>
  );
}
