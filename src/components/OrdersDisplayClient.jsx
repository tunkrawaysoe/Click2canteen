"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Box
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

export default function OrdersDisplayClient({ restaurantId, initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    if (!restaurantId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe(`restaurant-${restaurantId}`);
    channel.bind("order:new", (newOrder) => {
        console.log("New Order",newOrder)
      setOrders((prev) => [newOrder, ...prev]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [restaurantId]);

  return (
    <Box sx={{ p: 4 }}>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delivery Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Total Amount (MMK)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric", month: "short", day: "2-digit",
                    hour: "2-digit", minute: "2-digit", hour12: true,
                  }).format(new Date(order.createdAt))}
                </TableCell>
                <TableCell>{order.user?.name || "Unknown"}</TableCell>
                <TableCell>{order.deliveryAddress || "-"}</TableCell>
                <TableCell align="right">
                  {order.totalPrice?.toLocaleString() || 0}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={
                      order.status === "PENDING"
                        ? "warning.main"
                        : order.status === "DELIVERED"
                        ? "success.main"
                        : order.status === "CANCELLED"
                        ? "error.main"
                        : "info.main"
                    }
                  >
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/orders/${order.id}`}>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
