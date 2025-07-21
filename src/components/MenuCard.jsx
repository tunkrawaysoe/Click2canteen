import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Typography, Button, Chip, Box } from "@mui/material";

export default function MenuCard({
  id,
  title,
  description,
  price,
  imageUrl,
  canteenId,
  isActive,
  
}) {
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

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
        alignItems: "stretch", // for matching heights
        minHeight: { xs: 140, sm: "auto" }, // fixed height on mobile
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
            left: 20,
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
          width: { xs: "40%", sm: "100%" },    // 40% width on xs, full on sm+
          height: { xs: 140, sm: 180 },       // fixed height on small screens
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
          <Link href={`/canteens/${canteenId}/menu/${id}`} passHref legacyBehavior>
            <Button
              component="a"
              sx={{
                backgroundColor: "#253863",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.8rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1e2b4f",
                },
              }}
              size="small"
              variant="contained"
            >
              Details
            </Button>
          </Link>

          <Link
            href={`/tests/restaurants/${canteenId}/menu/${id}/update-menu`}
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
        </Box>
      </CardContent>
    </Card>
  );
}
