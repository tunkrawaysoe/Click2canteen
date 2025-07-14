// components/MenuContent.tsx
import MenuCard from "@/components/MenuCard";
import { getAllMenus } from "@/lib/data/menu/menu";
import { getRestaurantById } from "@/lib/data/restaurant/restaurant";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80";

export default async function MenuContent({ canteenId }) {
  const menus = await getAllMenus(canteenId);
  const restaurant = await getRestaurantById(canteenId);

  return (
    <div className="w-[95%] mx-auto py-8">
      {/* Restaurant Image with gradient overlay */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-8">
        <Image
          src={restaurant.imageUrl || defaultImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent z-10" />
        <div className="absolute bottom-6 left-6 z-20 text-left max-w-[70%] text-white drop-shadow-lg">
          <h1 className="text-4xl font-extrabold uppercase tracking-widest">
            {restaurant.name}
          </h1>
          <p className="mt-3 flex items-center space-x-2 text-gray-300 font-medium drop-shadow-sm">
            <MapPin className="w-5 h-5" />
            <span>{restaurant.address}</span>
          </p>
          <p className="mt-1 flex items-center space-x-2 text-gray-300 font-light drop-shadow-sm">
            <Phone className="w-5 h-5" />
            <span>{restaurant.phone}</span>
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {menus.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description || ""}
            isActive={item.isActive}
            price={`MMK ${item.price.toLocaleString()}`}
            imageUrl={item.imageUrl}
            canteenId={canteenId}
          />
        ))}
      </div>
    </div>
  );
}
