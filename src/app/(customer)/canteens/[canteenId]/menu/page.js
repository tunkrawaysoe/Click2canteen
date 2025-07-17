// app/canteens/[canteenId]/menu/page.tsx
import { Suspense } from "react";
import MenuContent from "@/components/MenuContent";

export default async function Menu({ params, searchParams }) {
  const { canteenId } = await params;
  const {category} = await searchParams;
  console.log(category)
  return (
    <Suspense fallback={<MenuFallback />}>
      <MenuContent canteenId={canteenId} searchParams={searchParams} category={category} />
    </Suspense>
  );
}

// Simple Tailwind-based skeleton loader
function MenuFallback() {
  return (
    <div className="w-[95%] mx-auto py-8">
      <div className="w-full h-64 bg-gray-300 animate-pulse rounded-2xl mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
        ))}
      </div>
    </div>
  );
}
