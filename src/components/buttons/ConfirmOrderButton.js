"use client";

import { placeOrder } from "@/actions/cart";
import SubmitButton from "./SubmitButton";

export default function ConfirmOrderButton({ userId }) {
  return (
    <form action={placeOrder}>
      <input type="hidden" name="userId" value={userId} />
      <SubmitButton label="Confirm Order" />
    </form>
  );
}
