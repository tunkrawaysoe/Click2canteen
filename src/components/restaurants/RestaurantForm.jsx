"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/utils/uploadthing";
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
  const [kpayPhones, setKpayPhones] = useState(
    initialData?.kpayPhones?.length > 0 ? initialData.kpayPhones : [""]
  );
  const router = useRouter();

  const handleKpayPhoneChange = (index, value) => {
    const updated = [...kpayPhones];
    updated[index] = value;
    setKpayPhones(updated);
  };

  async function handleFormAction(formData) {
    if (imageUrl) formData.set("imageUrl", imageUrl);
    if (qrCodeUrl) formData.set("qrCodeUrl", qrCodeUrl);
    if (mode === "edit") formData.set("id", initialData.id);

    // Convert isOpen from string to boolean
    formData.set("isOpen", formData.get("isOpen") === "true");

    kpayPhones
      .filter((phone) => phone.trim() !== "")
      .forEach((phone) => formData.append("kpayPhones[]", phone));

    try {
      setStatus(null);

      const result = await onSubmit(formData);

      if (result?.error) {
        setStatus({ type: "error", message: result.error });
      } else {
        setStatus({
          type: "success",
          message: `Restaurant ${mode === "edit" ? "updated" : "added"}!`,
        });
        router.push("/admin/canteens");
      }
    } catch (error) {
      setStatus({ type: "error", message: "❌ Something went wrong." });
      console.error(error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Update Canteen" : "Add Canteen"}
      </h1>

      {/* 🔹 Banner for errors/success */}
      {status && (
        <div
          className={`mb-4 p-3 rounded-md text-sm font-medium ${
            status.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {status.message}
        </div>
      )}

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

        {/* KPay Phone Inputs */}
        <div>
          <label className="block font-semibold mb-2">
            KBZ Pay Phone Numbers
          </label>
          {kpayPhones.map((phone, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder={`KPay Phone ${index + 1}`}
                value={phone}
                onChange={(e) => handleKpayPhoneChange(index, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              {kpayPhones.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...kpayPhones];
                    updated.splice(index, 1);
                    setKpayPhones(updated);
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setKpayPhones([...kpayPhones, ""])}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add another number
          </button>
        </div>

        {/* Upload Restaurant Image */}
        <div>
          <p className="mb-2 font-semibold text-gray-700">
            Upload Canteen Image
          </p>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const url =
                res?.[0]?.fileUrl || res?.[0]?.ufsUrl || res?.[0]?.url;
              if (url) setImageUrl(url);
              alert("Image Upload Completed");
            }}
            onUploadError={(error) =>
              alert(`Image Upload Error: ${error.message}`)
            }
          />
          {imageUrl && (
            <div className="mt-3 inline-block border w-32 h-32 overflow-hidden rounded shadow-sm">
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
              if (url) setQrCodeUrl(url);
              alert("QR Code Upload Completed");
            }}
            onUploadError={(error) =>
              alert(`QR Code Upload Error: ${error.message}`)
            }
          />
          {qrCodeUrl && (
            <div className="mt-3 inline-block border w-32 h-32 overflow-hidden rounded shadow-sm">
              <img
                src={qrCodeUrl}
                alt="QR Code preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Status Select */}
        <label className="block font-semibold mb-2">Status</label>
        <select
          name="isOpen"
          defaultValue={initialData?.isOpen ? "true" : "false"}
          className="w-full p-2 border rounded"
        >
          <option value="true">Open</option>
          <option value="false">Closed</option>
        </select>

        <SubmitButton
          label={mode === "edit" ? "Update Canteen" : "Add Canteen"}
        />
      </form>
    </div>
  );
}
