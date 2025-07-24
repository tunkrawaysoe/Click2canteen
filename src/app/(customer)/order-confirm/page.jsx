import { getOrderById } from "@/lib/data/order/orders";
import OrderConfirmClient from "./OrderConfirmClient";

export default async function OrderConfirmPage({ searchParams }) {
  const {orderId} = await searchParams;

  if (!orderId) {
    return <p>Order ID is missing.</p>;
  }

  const order = await getOrderById(orderId);

  if (!order) {
    return <p>Order not found.</p>;
  }

  return (
    <OrderConfirmClient
      orderId={order.id}
      initialStatus={order.status}
    />
  );
}
