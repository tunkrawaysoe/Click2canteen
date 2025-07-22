"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { addRestaurant, updateRestaurant } from "@/actions/restaurant";

export default function RestaurantForm({ initialData = null, mode = "add" }) {
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || null);

  async function handleFormAction(formData) {
    if (imageUrl) {
      formData.set("imageUrl", imageUrl);
    }

    if (mode === "edit") {
      formData.set("id", initialData.id); // ensure ID is passed
      const result = await updateRestaurant(formData);
      if (result?.error) {
        setStatus(`❌ ${result.error}`);
      } else {
        setStatus("✅ Restaurant updated!");
      }
    } else {
      const result = await addRestaurant(formData);
      if (result?.error) {
        setStatus(`❌ ${result.error}`);
      } else {
        setStatus("✅ Restaurant added!");
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Edit Restaurant" : "Add Restaurant"}
      </h1>

      <form action={handleFormAction} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={initialData?.name || ""}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          defaultValue={initialData?.phone || ""}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          defaultValue={initialData?.address || ""}
          className="w-full p-2 border rounded"
          required
        />

        {/* UploadThing image upload */}
        <div className="mb-4">
          <p className="mb-2 font-semibold text-gray-700">Upload Image</p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const url =
                res?.[0]?.fileUrl || res?.[0]?.ufsUrl || res?.[0]?.url;
              if (url) {
                setImageUrl(url);
              } else {
                console.warn("No valid URL in upload response");
              }
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`Upload Error: ${error.message}`);
            }}
          />
          {imageUrl && (
            <div className="mt-3 inline-block rounded overflow-hidden border border-gray-300 shadow-sm w-32 h-32">
              <img
                src={imageUrl}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isOpen"
            defaultChecked={initialData?.isOpen ?? true}
          />
          <span>Is Open</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={initialData?.isActive ?? true}
          />
          <span>Is Active</span>
        </label>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            mode === "edit" ? "bg-yellow-600" : "bg-blue-600"
          } hover:opacity-90`}
        >
          {mode === "edit" ? "Update Restaurant" : "Add Restaurant"}
        </button>
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
