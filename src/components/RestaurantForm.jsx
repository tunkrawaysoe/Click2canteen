"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function SubmitButton({ label, mode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full p-2 rounded text-white hover:opacity-90 ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : mode === "edit"
          ? "bg-yellow-600"
          : "bg-[linear-gradient(to_bottom,_#00022E,_#001D51)]"
      }`}
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export default function RestaurantForm({
  initialData = null,
  mode = "add",
  onSubmit,
}) {
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || null);
  const router = useRouter();

  async function handleFormAction(formData) {
    if (imageUrl) {
      formData.set("imageUrl", imageUrl);
    }

    if (mode === "edit") {
      formData.set("id", initialData.id);
    }

    try {
      const result = await onSubmit(formData);

      if (result?.error) {
        setStatus(`❌ ${result.error}`);
      } else {
        setStatus(`✅ Restaurant ${mode === "edit" ? "updated" : "added"}!`);
        router.push("/admin/canteens"); // ✅ Redirect after success
      }
    } catch (error) {
      setStatus("❌ Something went wrong.");
      console.error(error);
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
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          defaultValue={initialData?.phone || ""}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          defaultValue={initialData?.address || ""}
          required
          className="w-full p-2 border rounded"
        />

        <div>
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

        <SubmitButton
          label={mode === "edit" ? "Update Restaurant" : "Add Restaurant"}
          mode={mode}
        />
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
