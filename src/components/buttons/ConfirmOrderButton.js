"use client";

import { placeOrder } from "@/actions/cart";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

export default function ConfirmOrderButton({
  userId,
  paymentMethod,
  paymentProofUrl,
}) {
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setError(null); // Clear previous error
    const result = await placeOrder(formData);

    if (result?.error) {
      setError(result.error);
    }
  };

  const disableConfirm = paymentMethod === "kbzpay" && !paymentProofUrl;

  return (
    <div className="space-y-3">
      <form action={handleSubmit}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="paymentMethod" value={paymentMethod} />
        {paymentProofUrl && (
          <input type="hidden" name="paymentProofUrl" value={paymentProofUrl} />
        )}
        <SubmitButton label="Confirm Order" disabled={disableConfirm} />
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
