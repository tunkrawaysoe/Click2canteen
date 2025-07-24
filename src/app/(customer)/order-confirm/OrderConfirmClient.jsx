"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Box, Paper, Stack, Typography, Divider, Chip } from "@mui/material";

export default function OrderConfirmClient({ orderId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (!orderId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe(`order-${orderId}`);

    channel.bind("order:updated", (data) => {
      if (data.id === orderId) {
        setStatus(data.status);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [orderId]);

  const chipColor =
    status === "PENDING"
      ? "warning"
      : status === "DELIVERED"
      ? "success"
      : status === "CANCELLED"
      ? "error"
      : "default";

  const statusMessages = {
    PENDING:
      "Your order has been placed and is waiting for the restaurant to accept it. We’ll notify you once it’s confirmed.",
    DELIVERED: "Your order has been successfully delivered. Bon appétit!",
    CANCELLED:
      "Your order has been cancelled. If you have any questions, please contact support.",
    DEFAULT: "We’ll notify you as soon as the order status changes.",
  };

  const displayMessage = statusMessages[status] || statusMessages.DEFAULT;

  return (
    <Box maxWidth="600px" mx="auto" mt={10} px={2}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: "#f9fafb" }}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            Thank You for Your Order!
          </Typography>

          <Divider sx={{ width: "100%" }} />

          <Typography variant="body1" textAlign="center">
            Your order has been placed successfully.
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6" color="text.secondary">
              Status:
            </Typography>
            <Chip
              label={status}
              color={chipColor}
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            maxWidth={400}
          >
            {displayMessage}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
