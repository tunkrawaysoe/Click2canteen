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
  Container,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

import { getUser } from "@/lib/data/user/user";
import { getOrdersByRestaurantId } from "@/lib/data/order/orders";

export default async function OrdersHistoryPage() {
  const user = await getUser();
  const restaurantId = user.restaurantId;

  if (!restaurantId) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            No Restaurant Assigned
          </Typography>
          <Typography variant="body2">
            You are not associated with any restaurant. Please contact your
            administrator to be assigned one.
          </Typography>
        </Alert>
      </Container>
    );
  }

  // Fetch orders, with 'true' to get today's orders only (if your function supports that)
  const orders = await getOrdersByRestaurantId(restaurantId);

  return (
    <Box sx={{ p: 4 }}>
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
                {/* Format order creation date & time */}
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

                {/* Customer name */}
                <TableCell>{order.user?.name || "Unknown"}</TableCell>

                {/* Delivery address */}
                <TableCell>{order.deliveryAddress || "-"}</TableCell>

                {/* Total price, formatted */}
                <TableCell align="right">
                  {order.totalPrice?.toLocaleString() || 0}
                </TableCell>

                {/* Status with color */}
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

                {/* Link to order detail page with eye icon */}
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
