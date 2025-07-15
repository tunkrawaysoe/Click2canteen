"use client";

import { useState } from "react";
import { addMenuWithAddOns } from "@/actions/action"; // Your server action

export default function AddMenuFormClient({ canteenId }) {
  const [addons, setAddons] = useState([{ name: "", price: "" }]);

  const handleAddAddOn = () => setAddons([...addons, { name: "", price: "" }]);
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
    <form action={addMenuWithAddOns} className="space-y-4 p-4 max-w-md">
      <input type="hidden" name="restaurantId" value={canteenId} />

      <div>
        <label>Name</label>
        <input name="name" required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label>Category</label>
        <select name="category" className="w-full p-2 border rounded">
          <option value="" disabled selected>
            Select a category
          </option>
          <option value="APPETIZER">Appetizer</option>
          <option value="MAIN">Main</option>
          <option value="DESSERT">Dessert</option>
          <option value="DRINK">Drink</option>
          <option value="SNACK">Snack</option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea name="description" className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Image URL</label>
        <input name="imageUrl" className="w-full p-2 border rounded" />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked
          className="mr-2"
        />
        <label>Is Active</label>
      </div>

      <div>
        <label className="font-semibold">Add-Ons</label>
        {addons.map((addon, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name="addOnName"
              placeholder="Add-On Name"
              value={addon.name}
              onChange={(e) => handleAddOnChange(index, "name", e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <input
              type="number"
              name="addOnPrice"
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

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Menu
      </button>
    </form>
  );
}
