"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { updateOrderStatus } from "@/actions/orders"; // Your server action
import { toast } from "sonner";

function isNewOrder(orderTimestamp) {
  const TEN_MINUTES = 7 * 60 * 1000; // 7 minutes in ms
  return Date.now() - new Date(orderTimestamp).getTime() <= TEN_MINUTES;
}

export default function OrdersDisplayClient({ restaurantId, initialOrders }) {
  const [orders, setOrders] = useState(
    initialOrders.map((order) => ({
      ...order,
      receivedAt: new Date(order.createdAt),
      updating: false,
    }))
  );

  const [orderStatuses, setOrderStatuses] = useState(
    initialOrders.reduce((acc, order) => {
      acc[order.id] = order.status;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!restaurantId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe(`restaurant-${restaurantId}`);

    channel.bind("order:new", (newOrder) => {
      setOrders((prev) => [
        { ...newOrder, receivedAt: new Date(), updating: false },
        ...prev,
      ]);
      setOrderStatuses((prev) => ({
        ...prev,
        [newOrder.id]: newOrder.status,
      }));
    });

    channel.bind("order:updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id
            ? { ...order, status: updatedOrder.status, updating: false }
            : order
        )
      );
      setOrderStatuses((prev) => ({
        ...prev,
        [updatedOrder.id]: updatedOrder.status,
      }));
      toast.success("Order status updated");
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [restaurantId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) => [...prev]); // trigger re-render to update "New" highlight
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = async (orderId, newStatus) => {
    setOrderStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus, updating: true } : o
      )
    );

    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("status", newStatus);

      await updateOrderStatus(formData);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, updating: false } : o))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, updating: false } : o))
      );
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Phone Number
              </TableCell>{" "}
              {/* Added */}
              <TableCell sx={{ fontWeight: "bold" }}>
                Delivery Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Total (MMK)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const isNew = isNewOrder(order.receivedAt);

              return (
                <TableRow
                  key={order.id}
                  sx={{ backgroundColor: isNew ? "#e3f2fd" : "inherit" }}
                >
                  <TableCell>
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }).format(new Date(order.createdAt))}
                  </TableCell>
                  <TableCell>
                    {order.user?.name || "Unknown"}
                    {isNew && (
                      <Chip
                        label="New"
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{order.phoneNumber || "-"}</TableCell>{" "}
                  {/* Added */}
                  <TableCell>{order.deliveryAddress || "-"}</TableCell>
                  <TableCell align="right">
                    {order.totalPrice?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        name="status"
                        value={orderStatuses[order.id] || order.status}
                        onChange={(e) => handleChange(order.id, e.target.value)}
                        disabled={order.updating}
                        sx={{
                          minWidth: 110,
                          color:
                            orderStatuses[order.id] === "PENDING"
                              ? "warning.main"
                              : orderStatuses[order.id] === "PREPARING"
                              ? "info.main"
                              : orderStatuses[order.id] === "DELIVERED"
                              ? "success.main"
                              : orderStatuses[order.id] === "CANCELLED"
                              ? "error.main"
                              : "text.primary",
                        }}
                      >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="PREPARING">Preparing</MenuItem>
                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {order.updating ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Link href={`/admin/orders/${order.id}`}>
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
