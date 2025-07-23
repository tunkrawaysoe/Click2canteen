"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/users";
import { UploadDropzone } from "@/lib/utils/uploadthing";

export default function UpdateProfileForm({ user }) {
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.profileImage || "");
  const router = useRouter();

  return (
    <div className=" flex items-center justify-center bg-gray-50 px-4 py-15">
      <form
        action={updateProfile}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-5"
      >
        <h2 className="text-xl font-bold text-center text-gray-700">
          Update Profile
        </h2>

        <input type="hidden" name="userId" value={user.id} />
        {imageUrl && (
          <input type="hidden" name="profileImage" value={imageUrl} />
        )}

        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Profile Image
          </label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const url =
                res?.[0]?.fileUrl || res?.[0]?.url || res?.[0]?.ufsUrl;
              if (url) {
                setImageUrl(url);
                alert("Upload Completed");
              }
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />

          {imageUrl && (
            <div className="mt-3 w-24 h-24 border rounded overflow-hidden">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-b from-[#00022E] to-[#001D51] text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
