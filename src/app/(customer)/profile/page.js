"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getUser } from "@/lib/data/user/user";


export default function ProfilePage() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    given_name: "",
    family_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        given_name: user.given_name || "",
        family_name: user.family_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center text-xl text-gray-700">
        Please log in to view your profile.
      </div>
    );
  }

   const handleChange = (e) => {

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    // TODO: Optional: Save to your own DB
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <Image
            src={user?.picture || background}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {formData.given_name} {formData.family_name}
        </h2>

        <p className="text-gray-500 mb-4">{formData.email}</p>

        {isEditing ? (
          <div className="w-full space-y-4">
            <input
              name="given_name"
              value={formData.given_name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="First Name"
            />
            <input
              name="family_name"
              value={formData.family_name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Last Name"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              placeholder="Email"
              disabled
            />

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded font-medium"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
