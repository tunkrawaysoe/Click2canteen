"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography, Stack } from "@mui/material";

import cashImg from '../../public/logo/cash.png';
import kbzImg from '../../public/logo/kbz.png';


const paymentOptions = [
  { value: "cash", label: "Cash", imgSrc: cashImg },
  { value: "kbzpay", label: "KBZ Pay", imgSrc: kbzImg },

];

export default function PaymentSelector({ paymentMethod, setPaymentMethod }) {
  return (
    <Box my={4}>
      <Typography variant="h6" mb={2}>
        Choose Payment Method
      </Typography>

      <Stack spacing={2}>
        {paymentOptions.map(({ value, label, imgSrc }) => {
          const selected = paymentMethod === value;

          return (
            <Box
              key={value}
              onClick={() => setPaymentMethod(value)}
              sx={{
                border: selected ? "3px solid #1976d2" : "2px solid #ccc",
                borderRadius: 2,
                padding: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                userSelect: "none",
                transition: "border-color 0.3s",
                "&:hover": {
                  borderColor: "#1976d2",
                },
              }}
            >
              <Image
                src={imgSrc}
                alt={label}
                width={48}
                height={48}
                style={{ objectFit: "contain", marginRight: 12 }}
              />
              <Typography variant="body1">{label}</Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
