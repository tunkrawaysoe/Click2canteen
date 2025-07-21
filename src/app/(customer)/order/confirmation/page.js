import { getOrderById } from "@/lib/data/order/orders";
import { Box, Paper, Stack, Typography, Divider, Chip } from "@mui/material";

export default async function OrderConfirmPage({ searchParams }) {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <Box maxWidth="600px" mx="auto" mt={10} px={2}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" color="error" textAlign="center">
            Order ID is missing.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const order = await getOrderById(orderId);

  if (!order) {
    return (
      <Box maxWidth="600px" mx="auto" mt={10} px={2}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h6" color="error" textAlign="center">
            Order not found.
          </Typography>
        </Paper>
      </Box>
    );
  }

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
              label={order.status}
              color={
                order.status === "Pending"
                  ? "warning"
                  : order.status === "Completed"
                  ? "success"
                  : order.status === "Cancelled"
                  ? "error"
                  : "default"
              }
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            maxWidth={400}
          >
            We will notify you once your order is ready for pickup or delivery.
            Thank you for choosing us!
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
