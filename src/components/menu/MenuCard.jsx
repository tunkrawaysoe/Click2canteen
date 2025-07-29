import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { hasPermission } from "@/lib/rbac";

export default function MenuCard({
  id,
  title,
  description,
  price,
  imageUrl,
  canteenId,
  isActive,
  user,
}) {
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

  const canEdit = hasPermission(user, "update", "menu", user?.restaurantId);
  const canViewDetails = user?.role === "CUSTOMER" || user?.role === "GUEST";

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        p: 1,
        borderRadius: 1,
        boxShadow: 1,
        overflow: "hidden",
        bgcolor: "#f3f4f6",
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        gap: { xs: 1, sm: 1.5 },
        opacity: isActive ? 1 : 0.6,
        pointerEvents: isActive ? "auto" : "none",
        alignItems: "stretch",
        minHeight: { xs: 140, sm: "auto" },
      }}
      elevation={3}
    >
      {!isActive && (
        <Chip
          label="Out of Stock"
          size="small"
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            bgcolor: "#dc2626",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.75rem",
            px: 0.5,
            py: 0.5,
            borderRadius: 1,
            boxShadow: 1,
            zIndex: 10,
          }}
        />
      )}

      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "40%", sm: "100%" },
          height: { xs: 140, sm: 180 },
          borderRadius: 1,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={imageUrl || defaultImageUrl}
          alt={title}
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </Box>

      {/* Content Section */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: { xs: "60%", sm: "100%" },
          py: 1,
          px: 2,
          gap: 1,
        }}
      >
        <div>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "black",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#047857" }}
          >
            {price}
          </Typography>
        </div>

        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* CUSTOMER ONLY: Details */}
          {canViewDetails && (
            <Link
              href={`/canteens/${canteenId}/menu/${id}`}
              passHref
              legacyBehavior
            >
              <Button
                component="a"
                sx={{
                  background: "linear-gradient(to bottom, #00022E, #001D51)",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  "&:hover": {
                    background: "#253863",
                  },
                }}
                size="small"
                variant="contained"
              >
                Details
              </Button>
            </Link>
          )}

          {canEdit && (
            <Link
              href={`/admin/canteens/${canteenId}/menu/${id}/edit`}
              passHref
              legacyBehavior
            >
              <Button
                component="a"
                sx={{
                  backgroundColor: "#ca8a04",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#b77904",
                  },
                }}
                size="small"
                variant="contained"
              >
                Edit
              </Button>
            </Link>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
