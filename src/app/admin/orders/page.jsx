import { getUser } from "@/lib/data/user/user";
import { getOrdersByRestaurantId } from "@/lib/data/order/orders";
import { Container, Alert, Typography } from "@mui/material";
import OrdersDisplayClient from "@/components/orders/OrdersDisplayClient";

export default async function OrdersPage() {
  const user = await getUser();
  const restaurantId = user.restaurantId;

  if (!restaurantId) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="warning">
          <Typography variant="h6">No Restaurant Assigned</Typography>
          <Typography variant="body2">
            You are not associated with any restaurant.
          </Typography>
        </Alert>
      </Container>
    );
  }

  const orders = await getOrdersByRestaurantId(restaurantId, true);
  return <OrdersDisplayClient restaurantId={restaurantId} initialOrders={orders} />;
}
