"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { useFormStatus } from "react-dom";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 rounded text-white ${
        pending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
      }`}
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

export default function MenuFormClient({
  canteenId,
  menu = null,
  onSubmit,
  submitLabel = "Save Menu",
}) {
  const [addons, setAddons] = useState([{ name: "", price: "" }]);
  const [isSpecial, setIsSpecial] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (menu) {
      setAddons(
        menu.addOns?.length
          ? menu.addOns.map((a) => ({
              name: a.name,
              price: a.price.toString(),
            }))
          : [{ name: "", price: "" }]
      );
      setIsSpecial(menu.isSpecial ?? false);
      if (menu.imageUrl) setImageUrl(menu.imageUrl);
    }
  }, [menu]);

  const handleAddAddOn = () => {
    setAddons([...addons, { name: "", price: "" }]);
  };

  const handleRemoveAddOn = (index) => {
    const updated = [...addons];
    updated.splice(index, 1);
    setAddons(updated);
  };

  const handleAddOnChange = (index, field, value) => {
    const updated = [...addons];
    updated[index][field] = value;
    setAddons(updated);
  };

  return (
    <form action={onSubmit} className="space-y-4 p-4 max-w-md">
      {menu?.id && <input type="hidden" name="menuId" value={menu.id} />}
      <input type="hidden" name="restaurantId" value={canteenId} />
      {imageUrl && <input type="hidden" name="imageUrl" value={imageUrl} />}
      <input
        type="hidden"
        name="addOns"
        value={JSON.stringify(addons.filter((a) => a.name && a.price))}
      />

      <div>
        <label>Name</label>
        <input
          name="name"
          defaultValue={menu?.name || ""}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={menu?.price?.toString() || ""}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Category</label>
        <select
          name="category"
          defaultValue={menu?.category || "APPETIZER"}
          className="w-full p-2 border rounded"
        >
          <option value="APPETIZER">Appetizer</option>
          <option value="MAIN">Main</option>
          <option value="DESSERT">Dessert</option>
          <option value="DRINK">Drink</option>
          <option value="SNACK">Snack</option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          defaultValue={menu?.description || ""}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-700">Upload Image</p>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const url =
              res?.[0]?.fileUrl || res?.[0]?.url || res?.[0]?.ufsUrl;
            if (url) setImageUrl(url);
            alert("Upload Completed");
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {imageUrl && (
          <div className="mt-3 w-32 h-32 border rounded overflow-hidden shadow-sm">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={menu?.isActive ?? true}
        />
        <label>Instock</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isSpecial"
          checked={isSpecial}
          onChange={(e) => setIsSpecial(e.target.checked)}
        />
        <label>Special Menu</label>
      </div>

      <div>
        <label className="font-semibold">Add-Ons</label>
        {addons.map((addon, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add-On Name"
              value={addon.name}
              onChange={(e) =>
                handleAddOnChange(index, "name", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              step="0.01"
              value={addon.price}
              onChange={(e) =>
                handleAddOnChange(index, "price", e.target.value)
              }
              className="w-24 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveAddOn(index)}
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAddOn}
          className="text-sm text-blue-600 mt-1"
        >
          + Add Another
        </button>
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
