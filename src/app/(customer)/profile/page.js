// app/profile/page.tsx

import React from "react";
import { getUserWithOrders } from "@/lib/data/user/user";
import { Container, Box, Typography } from "@mui/material";

import OrderHistory from "@/components/UserOrderHistory";
import ProfileCard from "@/components/ProfileCard";

export default async function ProfilePage() {
  const user = await getUserWithOrders();

  if (!user || user.role === "GUEST") {
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Please log in to view your profile.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ position: "relative", mb: 6 }}>
        <ProfileCard user={user} />
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom fontWeight="semibold" mb={3}>
          Order History
        </Typography>

        <OrderHistory orders={user.orders} />
      </Box>
    </Container>
  );
}
