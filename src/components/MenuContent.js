import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { getAllMenus } from "@/lib/data/menu/menu";
import { getRestaurantById } from "@/lib/data/restaurant/restaurant";
import { Stack, Button } from "@mui/material";
import { CupSoda, Sandwich, Utensils, Sparkles } from "lucide-react";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80";

const categories = [
  { label: "All", icon: <Sparkles size={16} /> },
  { label: "MAIN", icon: <Utensils size={16} /> },
  { label: "DRINK", icon: <CupSoda size={16} /> },
  { label: "SNACK", icon: <Sandwich size={16} /> },
];

export default async function MenuContent({
  canteenId,
  searchParams,
  category,
}) {
  const selectedCategory = category || "All";

  const restaurant = await getRestaurantById(canteenId);

  const menus = await getAllMenus(
    canteenId,
    selectedCategory === "All" ? null : selectedCategory
  );

  // Separate special and normal menus
  const specialMenus = menus.filter((item) => item.isSpecial);
  const normalMenus = menus.filter((item) => !item.isSpecial);

  return (
    <div className="w-[95%] mx-auto py-8">
      {/* Restaurant Banner */}
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

      {/* Category Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ mb: 4 }}
      >
        {categories.map(({ label, icon }) => {
          const isSelected = selectedCategory === label;
          return (
            <Button
              key={label}
              href={`?category=${encodeURIComponent(label)}`}
              size="small"
              startIcon={icon}
              sx={{
                textTransform: "capitalize",
                borderRadius: "999px",
                px: 2.5,
                py: 1.2,
                fontWeight: 500,
                fontSize: "0.85rem",
                color: isSelected ? "#fff" : "#001D51",
                backgroundColor: isSelected ? "#001D51" : "#fff",
                border: isSelected ? "1px solid #001D51" : "1px solid #ddd",
                boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                "&:hover": {
                  backgroundColor: isSelected ? "#001A45" : "#f1f1f1",
                },
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>

      {/* Grid: Special menus first */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Render special menus first */}
        {specialMenus.map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* 🔥 Sticker-Style Special Badge */}
            <div className="absolute top-3 left-2 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-md rotate-[-9deg] z-10">
              SPECIAL
            </div>

            <MenuCard
              id={item.id}
              title={item.name}
              description={item.description || ""}
              isActive={item.isActive}
              price={`MMK ${item.price.toLocaleString()}`}
              imageUrl={item.imageUrl || defaultImageUrl}
              canteenId={canteenId}
            />
          </div>
        ))}

        {/* Then render normal menus */}
        {normalMenus.map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <MenuCard
              id={item.id}
              title={item.name}
              description={item.description || ""}
              isActive={item.isActive}
              price={`MMK ${item.price.toLocaleString()}`}
              imageUrl={item.imageUrl || defaultImageUrl}
              canteenId={canteenId}
            />
          </div>
        ))}

        {/* If no menus */}
        {menus.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No menu items found.
          </p>
        )}
      </div>
    </div>
  );
}
