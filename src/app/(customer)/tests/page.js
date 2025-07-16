"use client";

import { useState } from "react";

import { addRestaurant } from "@/actions/action";
import { UploadDropzone } from "@/lib/utils/uploadthing";

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
        <div className="mb-4 ">
          <p className="mb-2 font-semibold text-gray-700">Upload Image</p>

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Upload response:", JSON.stringify(res, null, 2));
              if (res && res.length > 0) {
                const url = res[0].fileUrl || res[0].ufsUrl || res[0].url;
                if (url) {
                  setImageUrl(url);
                } else {
                  console.warn("No valid file URL found in upload response");
                }
              }
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />

          {imageUrl && (
            <div className="mt-3 inline-block rounded overflow-hidden border border-gray-300 shadow-sm w-32 h-32">
              <img
                src={imageUrl}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
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
