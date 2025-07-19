// app/(customer)/canteens/page.jsx or .tsx
import Image from "next/image";
import Link from "next/link";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  Box,
} from "@mui/material";

import { getAllRestaurants } from "@/lib/data/restaurant/restaurant";
import DeleteRestaurantButton from "./DeleteRestaurantButton";
import { hasPermission } from "@/lib/rbac";
import { getUser } from "@/lib/data/user/user";

export default async function RestaurantsList() {
  const user = await getUser();
  console.log("Current user:", user);

  const restaurants = await getAllRestaurants();

  if (!user) {
    return <Typography>Please sign in to view restaurants.</Typography>;
  }

  if (restaurants.length === 0) {
    return <Typography>No restaurants found.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {restaurants.map((rest) => (
        <Card
          key={rest.id}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0.5, md: 1 },
            p: 1.5,
            borderRadius: 2,
            boxShadow: 1,
            opacity: rest.isOpen ? 1 : 0.6,
            pointerEvents: rest.isOpen ? "auto" : "none",
          }}
        >
          {hasPermission(user, "delete", "restaurant") && (
            <DeleteRestaurantButton restaurantId={rest.id} />
          )}

          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: 256 },
              height: 192,
              borderRadius: 3,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image
              src={
                rest.imageUrl ||
                "https://images.unsplash.com/photo-1555992336-03a23c1f5c54?auto=format&fit=crop&w=800&q=80"
              }
              alt={rest.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              px: 1.5,
              py: 1,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                {rest.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Phone Number: </strong> {rest.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                <strong>Address: </strong> {rest.address}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                {rest.isOpen ? (
                  <Chip label="Open" color="success" size="small" />
                ) : (
                  <Chip label="Closed" color="error" size="small" />
                )}
                {!rest.isActive && (
                  <Chip label="Inactive" color="warning" size="small" />
                )}
              </Stack>
            </Box>

            <Stack direction="row" spacing={2}>
              {rest.isOpen && (
                <Link href={`/canteens/${rest.id}/menu`} passHref legacyBehavior>
                  <Button
                    component="a"
                    variant="contained"
                    sx={{
                      background: "linear-gradient(to bottom, #00022E, #001D51)",
                      color: "#ffffff",
                      px: 3,
                      py: 1,
                      borderRadius: 1,
                      textTransform: "none",
                      "&:hover": {
                        background: "linear-gradient(to bottom, #00022E, #001D51)",
                        opacity: 0.9,
                      },
                    }}
                  >
                    View Menu
                  </Button>
                </Link>
              )}

              {hasPermission(user, "create", "menu") && (
                <Link href={`/canteens/${rest.id}/add-menu`} passHref legacyBehavior>
                  <Button component="a" variant="contained" color="success">
                    + Add Menu
                  </Button>
                </Link>
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
