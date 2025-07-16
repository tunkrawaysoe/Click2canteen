"use client";

import { useState } from "react";
import { addRestaurant } from "@/actions/action";
import { Stack, Button } from "@mui/material";
import Link from "next/link";

export default function AddCanteenPage() {
  const [status, setStatus] = useState(null);

  async function handleFormAction(formData) {
    const result = await addRestaurant(formData);
    if (result?.error) {
      setStatus(`❌ ${result.error}`);
    } else {
      setStatus("✅ Restaurant added!");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Stack alignItems="flex-start" marginBottom="15px">
        <Link href="/admin/managecanteen/">
          <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
            Back
          </Button>
        </Link>
      </Stack>
      <h1 className="text-2xl font-bold mb-4">Add Canteen</h1>

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
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (optional)"
          className="w-full p-2 border rounded"
        />

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
