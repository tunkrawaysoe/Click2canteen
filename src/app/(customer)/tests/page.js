"use client";

import { useState } from "react";

import { addRestaurant } from "@/actions/action";
import { UploadButton } from "@uploadthing/react";

export default function AddRestaurantPage() {
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  async function handleFormAction(formData) {
    if (imageUrl) {
      formData.set("imageUrl", imageUrl);
    }

    const result = await addRestaurant(formData);
    if (result?.error) {
      setStatus(`❌ ${result.error}`);
    } else {
      setStatus("✅ Restaurant added!");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Restaurant</h1>

      <form action={handleFormAction} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 border rounded"
          required
        />

        {/* UploadThing image upload */}
        <div className="mb-4">
          <p className="mb-2 font-semibold text-gray-700">Upload Image</p>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res?.[0]?.url || "");
              setStatus("✅ Image uploaded!");
            }}
            onUploadError={(err) => {
              setStatus(`❌ Upload failed: ${err.message}`);
            }}
            appearance={{
              button:
                "bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all disabled:opacity-50",
              container: "inline-block",
            }}
            content={{
              button({ ready, uploading }) {
                if (uploading) return "Uploading...";
                return ready ? "📁 Upload Image" : "Loading...";
              },
            }}
          />

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="mt-3 h-32 w-32 object-cover rounded border shadow-sm"
            />
          )}
        </div>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isOpen" defaultChecked />
          <span>Is Open</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isActive" defaultChecked />
          <span>Is Active</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:opacity-90"
        >
          Add Restaurant
        </button>
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
