// components/AddToCartButton.tsx
"use client";
import { useFormStatus } from "react-dom";

export default function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-6 px-4 py-2 rounded text-white cursor-pointer ${
        pending
          ? "bg-gray-500"
          : "bg-gradient-to-b from-[#00022E] to-[#001D51]"
      }`}
    >
      {pending ? "Adding..." : "Add to Cart"}
    </button>
  );
}
