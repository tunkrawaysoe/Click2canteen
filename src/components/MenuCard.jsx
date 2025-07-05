import Image from "next/image";

export default function MenuCard({ title, description, price, imageUrl }) {
  return (
    <div className="w-full p-2 bg-gray-200 rounded-lg shadow-md overflow-hidden flex flex-row sm:flex-col gap-4">
      {/* Image container */}
      <div className="relative w-1/3 sm:w-full h-32 sm:h-[180px] rounded-sm overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Text content */}
      <div className=" flex flex-col gap-2 justify-center w-2/3 sm:w-full">
        <h3 className="text-xl text-black font-semibold line-clamp-1">{title}</h3>
        
        <p className=" font-bold text-green-700">{price}</p>
        <button className="mt-2 px-3 py-1 bg-blue-900 text-white rounded hover:bg-green-700 transition">
          Details
        </button>
      </div>
    </div>
  );
}
