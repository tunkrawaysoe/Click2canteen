import {
  Avatar,
  Box,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getAllOrders } from "@/lib/data/order/orders";

export default async function OrderHistoryPage() {
  const orders = await getAllOrders();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      src={order.user?.profileImage || ""}
                      alt={order.user?.name || "User"}
                      sx={{ width: 30, height: 30 }}
                    />
                    <Box>
                      <Typography fontWeight="bold">
                        {order.user?.name || "Unknown"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.user?.email || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography fontWeight="bold">
                    {order.restaurant?.name || "N/A"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.restaurant?.address || ""}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell>{(order.totalPrice / 100).toFixed(2)} MMK</TableCell>

                <TableCell>
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(order.createdAt))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

// 🔧 Helper function to set chip color based on status
function getStatusColor(status) {
  switch (status) {
    case "PENDING":
      return "warning";
    case "CONFIRMED":
      return "info";
    case "PREPARING":
      return "primary";
    case "DELIVERED":
      return "success";
    case "CANCELLED":
      return "error";
    default:
      return "default";
  }
}
