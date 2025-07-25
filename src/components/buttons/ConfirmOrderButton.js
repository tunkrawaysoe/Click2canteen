"use client";

import { placeOrder } from "@/actions/cart";
import { useFormStatus } from "react-dom";
import { Button, CircularProgress } from "@mui/material";
import SubmitButton from "./SubmitButton";

export default function ConfirmOrderButton({ userId }) {
  return (
    <form action={placeOrder} method="post">
      <input type="hidden" name="userId" value={userId} />
      <SubmitButton label="Confirm Order" />
    </form>
  );
}
