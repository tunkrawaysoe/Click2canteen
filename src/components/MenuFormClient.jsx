"use client";

import { useState, useEffect } from "react";

export default function MenuFormClient({
  canteenId,
  menu = null,          // existing menu object for update, or null for add
  onSubmit,             // server action or handler function
  submitLabel = "Save Menu"
}) {
  const [addons, setAddons] = useState([{ name: "", price: "" }]);
  const [isSpecial, setIsSpecial] = useState(false);

  // Initialize form fields state with menu data if editing
  useEffect(() => {
    if (menu) {
      setAddons(menu.addOns?.length ? menu.addOns.map(a => ({
        name: a.name,
        price: a.price.toString()
      })) : [{ name: "", price: "" }]);
      setIsSpecial(menu.isSpecial ?? false);
    }
  }, [menu]);

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
    <form action={onSubmit} className="space-y-4 p-4 max-w-md">
      {menu?.id && (
        <input type="hidden" name="menuId" value={menu.id} />
      )}
      <input type="hidden" name="restaurantId" value={canteenId} />

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
        <label>Image URL</label>
        <input
          name="imageUrl"
          defaultValue={menu?.imageUrl || ""}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={menu?.isActive ?? true}
          className="mr-2"
        />
        <label>Is Active</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isSpecial"
          checked={isSpecial}
          onChange={(e) => setIsSpecial(e.target.checked)}
          className="mr-2"
        />
        <label>Is Special</label>
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
        {submitLabel}
      </button>
    </form>
  );
}
