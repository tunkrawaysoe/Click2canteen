import { PrismaClient } from "@/generated/prisma";
import Image from "next/image";

let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

      {restaurants.length === 0 && <p>No restaurants found.</p>}

      <div className="space-y-6">
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-md p-4"
          >
            <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden">
              <Image
                src={
                  rest.imageUrl ||
                  "https://images.unsplash.com/photo-1555992336-03a23c1f5c54?auto=format&fit=crop&w=800&q=80"
                }
                alt={rest.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold">{rest.name}</h2>
                <p className="text-sm text-gray-600">{rest.phone}</p>
                <p className="text-sm text-gray-600">{rest.address}</p>
              </div>

              <div className="flex gap-2 mt-4">
                {rest.isOpen ? (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    Open
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                    Closed
                  </span>
                )}
                {!rest.isActive && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
