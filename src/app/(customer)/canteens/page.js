import { Suspense } from "react";
import {
  Container,
  Typography,
  Skeleton,
  Stack,
  Box,
} from "@mui/material";
import RestaurantsList from "@/components/RestaurantLists";

export default function RestaurantsPage() {
  return (
    <Box sx={{ backgroundColor: "#FFF8E7", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          color="text.primary"
        >
          Restaurants
        </Typography>

        <Suspense fallback={<FallbackLoader />}>
          <RestaurantsList />
        </Suspense>
      </Container>
    </Box>
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
