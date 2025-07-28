"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import SubmitButton from "../buttons/SubmitButton";

export default function RestaurantForm({
  initialData = null,
  mode = "add",
  onSubmit,
}) {
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || null);
  const [qrCodeUrl, setQrCodeUrl] = useState(initialData?.qrCodeUrl || null);
  const router = useRouter();

  async function handleFormAction(formData) {
    if (imageUrl) {
      formData.set("imageUrl", imageUrl);
    }
    if (qrCodeUrl) {
      formData.set("qrCodeUrl", qrCodeUrl);
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
        router.push("/admin/canteens");
      }
    } catch (error) {
      setStatus("❌ Something went wrong.");
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Update Canteen" : "Add Canteen"}
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

        {/* Upload restaurant image */}
        <div>
          <p className="mb-2 font-semibold text-gray-700">
            Upload Restaurant Image
          </p>
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
              alert("Image Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`Image Upload Error: ${error.message}`);
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

        {/* Upload QR Code Image */}
        <div>
          <p className="mb-2 font-semibold text-gray-700">
            Upload QR Code Image
          </p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const url =
                res?.[0]?.fileUrl || res?.[0]?.ufsUrl || res?.[0]?.url;
              if (url) {
                setQrCodeUrl(url);
              } else {
                console.warn("No valid URL in QR upload response");
              }
              alert("QR Code Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`QR Code Upload Error: ${error.message}`);
            }}
          />
          {qrCodeUrl && (
            <div className="mt-3 inline-block rounded overflow-hidden border border-gray-300 shadow-sm w-32 h-32">
              <img
                src={qrCodeUrl}
                alt="QR Code preview"
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
          label={mode === "edit" ? "Update Canteen" : "Add Canteen"}
        />
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
