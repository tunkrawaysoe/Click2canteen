import { getOrderById } from "@/lib/data/order/orders";
import { notFound } from "next/navigation";
import { Box, Typography, Chip, Divider } from "@mui/material";
import OrderItemsTable from "@/components/OrderItemTable";

export default async function OrderDetailPage({ params }) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) return notFound();

  return (
    <Box sx={{ p: 4 }}>
      <OrderItemsTable orderItems={order.orderItems} />
    </Box>
  );
}
