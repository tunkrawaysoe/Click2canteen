// app/restaurants/page.tsx (or wherever your page file is)

import { Suspense } from "react";
import { Container, Typography, Skeleton, Stack } from "@mui/material";
import RestaurantsList from "@/components/RestaurantLists";


export default function RestaurantsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Restaurants
      </Typography>

      <Suspense fallback={<FallbackLoader />}>
        <RestaurantsList />
      </Suspense>
    </Container>
  );
}

// Simple fallback loader using Skeleton
function FallbackLoader() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={180} />
      ))}
    </Stack>
  );
}
