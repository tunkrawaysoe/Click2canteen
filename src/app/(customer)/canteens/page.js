import { Suspense } from "react";
import { Container, Typography, Skeleton, Stack, Box } from "@mui/material";
import RestaurantsList from "@/components/restaurants/RestaurantLists";
import { HandPlatter } from "lucide-react";

export default function RestaurantsPage() {
  return (
    <Box sx={{ minHeight: "100vh", py: 3 }}>
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
          <RestaurantsList isAdmin={false} />
        </Suspense>
      </Container>
    </Box>
  );
}

function FallbackLoader() {
  return (
    <Stack spacing={3}>
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            borderRadius: 3,
            boxShadow: 1,
            bgcolor: "background.paper",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={120}
            height={120}
            sx={{ borderRadius: 2 }}
          />
          <Box flex={1}>
            <Skeleton width="60%" height={24} />
            <Skeleton width="80%" height={18} sx={{ mt: 1 }} />
            <Skeleton width="40%" height={18} sx={{ mt: 1 }} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
