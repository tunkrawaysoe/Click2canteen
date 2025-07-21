"use client";

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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getAllOrders } from "@/lib/data/order/orders";
import Link from "next/link";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Orders Management
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount (MMK)</TableCell>
              <TableCell>Delivery Address</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.user?.name || "Unknown"}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(order.createdAt))}
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
                <TableCell>{order.totalPrice.toLocaleString()} MMK</TableCell>
                <TableCell>{order.deliveryAddress || "-"}</TableCell>
                <TableCell>
                  <Link href={`/admin/orders/${order.id}`}>
                    <IconButton aria-label="View Details">
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
