"use client";

import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import MenuCard from "@/components/menu/MenuCard";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80";

const categories = [
  { label: "All" },
  { label: "MAIN" },
  { label: "DRINK" },
  { label: "SNACK" },
];

export default function MenuGrid({ canteenId, isAdmin, user }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMenus = async (category) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/menus?canteenId=${canteenId}&category=${encodeURIComponent(
          selectedCategory
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch menus");
      const data = await res.json();
      setMenus(data);
    } catch (error) {
      console.error("Error fetching menus:", error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      {/* Category Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
        sx={{ mb: 4 }}
      >
        {categories.map(({ label }) => {
          const isSelected = selectedCategory === label;
          return (
            <Button
              key={label}
              onClick={() => setSelectedCategory(label)}
              size="small"
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
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>

      {/* Menu Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading menus...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
          {menus.map((item) => (
            <MenuCard
              key={item.id}
              id={item.id}
              title={item.name}
              description={item.description || ""}
              isActive={item.isActive}
              price={`MMK ${item.price.toLocaleString()}`}
              imageUrl={item.imageUrl || defaultImageUrl}
              canteenId={canteenId}
              isAdmin={isAdmin}
              user={user}
            />
          ))}
          {menus.length === 0 && !loading && (
            <p className="col-span-full text-center text-gray-500">
              No menu items found.
            </p>
          )}
        </div>
      )}
    </>
  );
}
