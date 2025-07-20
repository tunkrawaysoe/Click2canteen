"use client";

import { placeOrder } from "@/actions/cart";
import { useFormStatus } from "react-dom";
import { Button, CircularProgress } from "@mui/material";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      disabled={pending}
      startIcon={pending ? <CircularProgress size={20} /> : null}
      sx={{ float: "right" }}
    >
      {pending ? "Processing..." : label}
    </Button>
  );
}

export default function ConfirmOrderButton({ userId }) {
  return (
    <form action={placeOrder} method="post">
      <input type="hidden" name="userId" value={userId} />
      <SubmitButton label="Confirm Order" />
    </form>
  );
}
