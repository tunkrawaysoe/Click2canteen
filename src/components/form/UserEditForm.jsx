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

import { updateUserAction } from "@/actions/users";
import SubmitButton from "../buttons/SubmitButton";

export default function UserEditForm({ user, restaurants }) {
  const [role, setRole] = useState(user.role || "CUSTOMER");
  const [restaurantId, setRestaurantId] = useState(user.restaurantId || "");

  console.log("userrris", user);

  return (
    <form
      action={updateUserAction}
      method="POST"
      style={{ maxWidth: 500, margin: "2rem auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Assign Canteen To User
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
          <MenuItem value="ADMIN">SYSTEM_ADMIN</MenuItem>
          <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
          <MenuItem value="ADMIN">ADMIN</MenuItem>
        </Select>
      </FormControl>

      {role === "ADMIN" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Assign Canteen</InputLabel>
          <Select
            name="restaurantId"
            value={restaurantId}
            label="Assign Restaurant"
            onChange={(e) => setRestaurantId(e.target.value)}
          >
            <MenuItem value="">-- Select Canteen --</MenuItem>
            {restaurants.map((rest) => (
              <MenuItem key={rest.id} value={rest.id}>
                {rest.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box mt={2}>
        <SubmitButton label="Assign User" />
      </Box>
    </form>
  );
}
