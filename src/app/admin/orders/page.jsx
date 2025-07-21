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
import Link from "next/link";

import { getUser } from "@/lib/data/user/user";
import { getOrdersByRestaurantId } from "@/lib/data/order/orders";

export default async function OrdersPage() {
  const user = await getUser();
  const restaurantId = user.restaurantId;
  const orders = await getOrdersByRestaurantId(restaurantId);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Orders for Your Restaurant
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Delivery Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Total Amount (MMK)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
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
