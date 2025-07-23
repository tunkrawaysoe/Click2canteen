import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Paper, Stack, Typography, Chip, Divider, Box } from "@mui/material";

export default function OrderHistory({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center" mt={4}>
        You have no orders yet.
      </Typography>
    );
  }

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

  return (
    <Stack spacing={3}>
      {orders.map((order) => {
        const showStatus = order.status !== "PENDING";

        return (
          <Paper
            key={order.id}
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              backgroundColor: "#fff",
            }}
          >
            <Stack spacing={2}>
              {/* Header: Image + Restaurant + Status */}
              <Stack direction="row" alignItems="center" spacing={2}>
                {/* Restaurant image */}
                {order.restaurant?.imageUrl ? (
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      overflow: "hidden",
                      flexShrink: 0,
                      backgroundColor: "#f0f0f0",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={order.restaurant.imageUrl}
                      alt={order.restaurant.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="56px"
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      backgroundColor: "#ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontWeight: "bold",
                      fontSize: 20,
                      userSelect: "none",
                      flexShrink: 0,
                    }}
                  >
                    ?
                  </Box>
                )}

                {/* Restaurant name and status */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  component={Link}
                  href={`/canteens/${order.restaurant?.id}/menu`}
                  sx={{
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  }}
                >
                  {order.restaurant?.name || "Unknown"}
                </Typography>

                {showStatus && (
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor:
                        order.status === "DELIVERED"
                          ? "success.light"
                          : order.status === "PREPARING"
                          ? "warning.light"
                          : order.status === "CANCELLED"
                          ? "error.light"
                          : "grey.300",
                      color:
                        order.status === "DELIVERED"
                          ? "success.main"
                          : order.status === "PREPARING"
                          ? "warning.main"
                          : order.status === "CANCELLED"
                          ? "error.main"
                          : "text.primary",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Stack>

              {/* Order Date */}
              <Typography variant="caption" color="text.secondary">
                Ordered on {formatDate(order.createdAt)}
              </Typography>

              <Divider />

              {/* Items */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-line" }}
              >
                {order.orderItems
                  .map(
                    (item) =>
                      `${item.menu.name} x${item.quantity}` +
                      (item.orderItemAddOns.length > 0
                        ? ` (+${item.orderItemAddOns
                            .map((addOn) => addOn.addOn.name)
                            .join(", ")})`
                        : "")
                  )
                  .join(", ")}
              </Typography>

              {/* Total */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: "text.primary", mt: 1 }}
              >
                Total: {formatMMK(order.totalPrice)}
              </Typography>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}
