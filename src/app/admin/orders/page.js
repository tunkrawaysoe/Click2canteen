import { getAllOrders } from "@/lib/data/order/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  Typography,
  Box,
} from "@mui/material";

export const metadata = {
  title: "Orders Page",
  description: "View and manage all orders",
};

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
              <TableCell>User</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Delivery Address</TableCell>
              <TableCell>Items</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{order.restaurant.name}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={
                      order.status === "PENDING"
                        ? "warning.main"
                        : order.status === "DELIVERED"
                        ? "success.main"
                        : "info.main"
                    }
                  >
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.deliveryAddress || "-"}</TableCell>
                <TableCell>
                  <List dense disablePadding>
                    {order.orderItems.map((item) => (
                      <ListItem key={item.id} sx={{ px: 0, py: 0.5 }}>
                        {item.quantity} × {item.name} (${item.price.toFixed(2)})
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
