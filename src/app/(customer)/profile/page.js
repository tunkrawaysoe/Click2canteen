// app/profile/page.tsx or any server component file
import React from "react";
import Image from "next/image";
import { getUser } from "@/lib/data/user/user";

export default async function Profile() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="p-6 text-center text-xl text-gray-700">
        User not found or not authenticated.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <Image
            src={user.profileImage || "/images/defaultAvatar.png"} // fallback image path
            alt="Profile"
            width={96}
            height={96}
            className="object-cover rounded-full"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {user.name || "No name"}
        </h2>
        <p className="text-gray-500 mb-1">{user.email}</p>
        <p className="text-gray-500 mb-1">Role: {user.role}</p>
        {user.restaurantId && (
          <p className="text-gray-500">Restaurant ID: {user.restaurantId}</p>
        )}
      </div>
    </div>
  );
}
