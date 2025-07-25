"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Paper, Stack, Typography, Divider, Box } from "@mui/material";
import Pusher from "pusher-js";

const formatDate = (dateStr) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateStr));

const formatMMK = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MMK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export default function OrderHistory({ orders: initialOrders, userId }) {
  const [orders, setOrders] = useState(
    initialOrders.map((order) => ({ ...order, _justUpdated: false })) || []
  );

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe(`user-${userId}`);

    channel.bind("order:updated", (data) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === data.id
            ? { ...order, status: data.status, _justUpdated: true }
            : order
        )
      );

      setTimeout(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === data.id
              ? { ...order, _justUpdated: false }
              : order
          )
        );
      }, 1200);
    });

    return () => {
      pusher.unsubscribe(`user-${userId}`);
      pusher.disconnect();
    };
  }, [userId]);

  if (!orders.length) {
    return (
      <Box textAlign="center" mt={4} color="text.secondary">
        You have no orders yet.
      </Box>
    );
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case "DELIVERED":
        return { bg: "#e6ffed", text: "#007b34" };
      case "PREPARING":
        return { bg: "#fff4e5", text: "#b45309" };
      case "CANCELLED":
        return { bg: "#ffe6e6", text: "#d32f2f" };
      case "PENDING":
        return { bg: "#e0e0e0", text: "#555" };
      default:
        return { bg: "#e0e0e0", text: "#555" };
    }
  };

  return (
    <Stack spacing={3}>
      {orders.map((order) => {
        const { bg, text } = getStatusStyles(order.status);

        return (
          <Paper
            key={order.id}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: order._justUpdated ? "#f0fdfa" : "#fff",
              transition: "background-color 0.4s ease",
            }}
          >
            <Stack spacing={2}>
              {/* Header */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#f0f0f0",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {order.restaurant?.imageUrl ? (
                    <Image
                      src={order.restaurant.imageUrl}
                      alt={order.restaurant.name}
                      fill
                      sizes="56px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ccc",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#666",
                      }}
                    >
                      ?
                    </Box>
                  )}
                </Box>

                <Box flex={1}>
                  <Box
                    component={Link}
                    href={`/canteens/${order.restaurant?.id}/menu`}
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "primary.main",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {order.restaurant?.name || "Unknown"}
                  </Box>
                </Box>

                <Box
                  px={1.5}
                  py={0.5}
                  borderRadius={2}
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    bgcolor: bg,
                    color: text,
                    textTransform: "capitalize",
                  }}
                >
                  {order.status}
                </Box>
              </Stack>

              <Box fontSize={13} color="text.secondary">
                Ordered on {formatDate(order.createdAt)}
              </Box>

              <Divider />

              <Box sx={{ color: "text.secondary", whiteSpace: "pre-line" }}>
                {order.orderItems
                  .map(
                    (item) =>
                      `${item.menu.name} x${item.quantity}` +
                      (item.orderItemAddOns.length
                        ? ` (+${item.orderItemAddOns
                            .map((a) => a.addOn.name)
                            .join(", ")})`
                        : "")
                  )
                  .join(", ")}
              </Box>

              <Box fontWeight={700} mt={1}>
                Total: {formatMMK(order.totalPrice)}
              </Box>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
