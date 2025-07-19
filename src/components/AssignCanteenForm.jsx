"use client";

import { assignCanteenToAdmin } from "@/actions/assignCanteenToAdmin";
import { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";

export default function AssignCanteenForm({ admins, canteens }) {
  const [adminId, setAdminId] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleAssign = async () => {
    if (!adminId || !restaurantId) {
      setSnackbar({
        open: true,
        message: "Please select both admin and canteen.",
        type: "warning",
      });
      return;
    }

    try {
      await assignCanteenToAdmin(adminId, restaurantId);
      setSnackbar({
        open: true,
        message: "Canteen assigned successfully!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to assign canteen.",
        type: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: "auto",
        mt: 6,
        px: 3,
        py: 4,
        borderRadius: 3,
        border: "1px solid #ddd",
        bgcolor: "#f9f9f9",
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
        Assign Canteen to Admin
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Admin */}
        <Box flex={1}>
          <Typography fontWeight="medium" mb={1}>
            Select Admin
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Admin</InputLabel>
            <Select
              value={adminId}
              label="Admin"
              onChange={(e) => setAdminId(e.target.value)}
            >
              {admins.map((admin) => (
                <MenuItem key={admin.id} value={admin.id}>
                  {admin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Visual Divider */}
        <Box display={{ xs: "none", md: "flex" }} alignItems="center">
          <Divider orientation="vertical" sx={{ height: 60 }} />
        </Box>

        {/* Right: Canteen */}
        <Box flex={1}>
          <Typography fontWeight="medium" mb={1}>
            Select Canteen
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Canteen</InputLabel>
            <Select
              value={restaurantId}
              label="Canteen"
              onChange={(e) => setRestaurantId(e.target.value)}
            >
              {canteens.map((canteen) => (
                <MenuItem key={canteen.id} value={canteen.id}>
                  {canteen.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          onClick={handleAssign}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#0D47A1",
            "&:hover": {
              backgroundColor: "#08306b",
            },
          }}
        >
          Assign
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
