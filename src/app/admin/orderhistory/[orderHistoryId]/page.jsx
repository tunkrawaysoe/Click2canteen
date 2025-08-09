import { getOrderById } from "@/lib/data/order/orders";
import { notFound } from "next/navigation";
import { Box } from "@mui/material";
import OrderItemsTable from "@/components/orders/OrderItemTable";
import BackButton from "@/components/buttons/BackButton";

export default async function OrderHistoryDetailPage({ params }) {
  const { orderHistoryId } = await params;
  const order = await getOrderById(orderHistoryId);
  if (!order) return notFound();
  const payMentMethod = order.paymentMethod;
  const payMentUrl = order.paymentUrl;
  const serviceType = order.serviceType;
  console.log("serviceType", serviceType);

  return (
    <Box sx={{ p: 4 }}>
      <OrderItemsTable
        orderItems={order.orderItems}
        payMentMethod={payMentMethod}
        payMentUrl={payMentUrl}
        serviceType={serviceType}
      />

      {/* Add margin-top here for spacing */}
      <Box mt={3}>
        <BackButton />
      </Box>
    </Box>
  );
}
