import Image from "next/image";
import Link from "next/link";

export default function MenuCard({
  id,
  title,
  description,
  price,
  imageUrl,
  canteenId,
  isActive,
}) {
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="relative w-full p-2 rounded-lg shadow-lg overflow-hidden">
      {!isActive && (
        <span className="absolute top-5 left-5 z-10 bg-red-600 text-white font-bold text-xs px-2 py-1 rounded shadow">
          Out of Stock
        </span>
      )}

      <div
        className={`flex flex-row sm:flex-col gap-4 bg-gray-100 rounded-lg ${
          !isActive ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div className="relative w-1/3 sm:w-full h-32 sm:h-[180px] rounded-sm overflow-hidden">
          <Image
            src={imageUrl || defaultImageUrl}
            alt={title}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center w-2/3 sm:w-full p-2">
          <h3 className="text-xl text-black font-semibold line-clamp-1">
            {title}
          </h3>
          <p className="font-bold text-green-700">{price}</p>

          <div className="flex gap-2 mt-2">
            <Link href={`/tests/restaurants/${canteenId}/menu/${id}`} passHref>
              <button className="px-3 py-1 bg-[#253863] text-white rounded hover:opacity-90 transition">
                Details
              </button>
            </Link>

            <Link
              href={`/tests/restaurants/${canteenId}/menu/${id}/update-menu`}
              passHref
            >
              <button className="px-3 py-1 bg-yellow-600 text-white rounded hover:opacity-90 transition">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
