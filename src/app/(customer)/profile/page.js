// components/ProfilePage.jsx
"use client";
import { useState } from "react";

export default function ProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xl w-full">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            src={user?.image || "/default-avatar.png"}
            alt="Profile"
          />

          {isEditing ? (
            <>
              <input
                className="mt-4 text-xl font-bold text-center border-b border-gray-300 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="mt-2 text-gray-600 text-center border-b border-gray-300 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mt-4">{name}</h1>
              <p className="text-gray-600">{email}</p>
              <button
                className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
