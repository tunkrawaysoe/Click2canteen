import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ProfileCard({ user }) {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 600,
        mx: "auto",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "transparent",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{
            flexShrink: 0,
            width: 150,
            height: 150,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={user.profileImage || "/images/defaultAvatar.png"}
            alt="Profile"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            color="text.primary"
            gutterBottom
            sx={{ letterSpacing: 1 }}
          >
            {user.name}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={700}
            gutterBottom
          >
            {user.email}
          </Typography>

          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Total Orders: {user.orders.length}
          </Typography>
        </Box>
      </Box>

      {/* Button BELOW the profile info */}
      <Box mt={3} textAlign="center">
        <Button
          component={Link}
          href={`/profile/${user.id}/edit`}
          variant="contained"
          sx={{
            background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(180deg, #001D51 0%, #00022E 100%)",
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Paper>
  );
}
