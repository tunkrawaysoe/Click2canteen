import { Suspense } from "react";
import { Container, Typography, Skeleton, Stack, Box } from "@mui/material";
import RestaurantsList from "@/components/RestaurantLists";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { HandPlatter } from "lucide-react";

export default function RestaurantsPage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 3}}>
      <Container maxWidth="md">
        <Box display="flex" alignItems="center" mb={3} gap={1.5}>
          <HandPlatter sx={{ color: "#001D51", fontSize: 32 }} />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              background: "linear-gradient(to bottom, #00022E, #001D51)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em",
              textTransform: "capitalize",
              fontFamily:
                '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
              fontSize: { xs: "1.4rem", sm: "1.6rem" },
              userSelect: "none",
              lineHeight: 1.2,
            }}
          >
            Explore Tasty Canteens
          </Typography>
        </Box>

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
