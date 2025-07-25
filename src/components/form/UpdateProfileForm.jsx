"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/users";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import SubmitButton from "../buttons/SubmitButton";

export default function UpdateProfileForm({ user }) {
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.profileImage || "");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-15">
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
                setUploadSuccess(true);
              }
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {/* Underline blue success message */}
          {uploadSuccess && (
            <p className="mt-6 text-green-700 text-sm font-medium pb-1 select-none">
              Upload completed successfully
            </p>
          )}
        </div>

        {imageUrl && (
          <div className="mt-1 w-24 h-24 border rounded overflow-hidden">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <SubmitButton label="Edit" />
      </form>
    </div>
  );
}
