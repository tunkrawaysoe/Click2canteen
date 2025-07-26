"use client";

import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import PaymentSelector from "./PaymentSelector";
import ConfirmOrderButton from "@/components/buttons/ConfirmOrderButton";

export default function PaymentSelectorWrapper({ userId, grandTotal }) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <>
      <PaymentSelector
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Total: {grandTotal.toLocaleString()} MMK
        </Typography>
        <ConfirmOrderButton userId={userId} paymentMethod={paymentMethod} />
      </Stack>
    </>
  );
}
