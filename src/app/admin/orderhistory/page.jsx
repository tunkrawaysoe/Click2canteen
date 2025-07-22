
import { getAllOrders } from "@/lib/data/order/orders";
export default async function OrderHistoryPage() {
  const orders = await getAllOrders();
  console.log(orders)

  
}