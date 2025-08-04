import { getUser } from "@/lib/data/user/user";
import { getRestaurantById } from "@/lib/data/restaurant/restaurant";
import Image from "next/image";
import BackButton from "../buttons/BackButton";
import { MapPin, Phone } from "lucide-react";
import MenuGrid from "../MenuGrid";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80";

export default async function MenuContent({ canteenId, isAdmin, category }) {
  const restaurant = await getRestaurantById(canteenId);
  const user = await getUser();

  return (
    <div className="w-[95%] mx-auto py-8">
      {/* Banner */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-8">
        <Image
          src={restaurant?.imageUrl || defaultImageUrl}
          alt={restaurant?.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent z-10" />
        <div className="absolute bottom-6 left-6 z-20 text-white drop-shadow-lg max-w-[70%]">
          <h1 className="text-4xl font-extrabold uppercase tracking-widest">
            {restaurant?.name}
          </h1>
          <p className="mt-3 flex items-center text-gray-300">
            <MapPin className="w-5 h-5 mr-1" />
            {restaurant?.address}
          </p>
          <p className="mt-1 flex items-center text-gray-300">
            <Phone className="w-5 h-5 mr-1" />
            {restaurant?.phone}
          </p>
        </div>
      </div>

      {/* Menu Grid (Client) */}
      <MenuGrid
        canteenId={canteenId}
        isAdmin={isAdmin}
        user={user}
        category={category}
      />

      <BackButton />
    </div>
  );
}
