"use client";

import { useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

import SubmitButton from "./SubmitButton";
import { updateUserAction } from "@/actions/users";

export default function UserEditForm({ user, restaurants }) {
  const [role, setRole] = useState(user.role || "CUSTOMER");
  const [restaurantId, setRestaurantId] = useState(user.restaurantId || "");

  return (
    <Box
      action={updateUserAction}
      component="form"
      method="POST"
      sx={{ maxWidth: 500, mx: "auto", mt: 4 }}
    >
      <Typography variant="h5" gutterBottom>
        Edit User
      </Typography>

      <input type="hidden" name="id" value={user.id} />

      <TextField
        fullWidth
        label="User Name"
        value={user.name}
        disabled
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </FormControl>

      {role === "ADMIN" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Assign Restaurant</InputLabel>
          <Select
            name="restaurantId"
            value={restaurantId}
            label="Assign Restaurant"
            onChange={(e) => setRestaurantId(e.target.value)}
          >
            <MenuItem value="">-- Select Restaurant --</MenuItem>
            {restaurants.map((rest) => (
              <MenuItem key={rest.id} value={rest.id}>
                {rest.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <SubmitButton />
    </Box>
  );
}
