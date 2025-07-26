"use client";

import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import SubmitButton from "../buttons/SubmitButton";

export default function MenuFormClient({ canteenId, onSubmit, submitLabel }) {
  const [addOns, setAddOns] = useState([{ name: "", price: "" }]);

  const handleAddOnChange = (index, field, value) => {
    const newAddOns = [...addOns];
    newAddOns[index][field] = value;
    setAddOns(newAddOns);
  };

  const addAddOnField = () => {
    setAddOns([...addOns, { name: "", price: "" }]);
  };

  const removeAddOnField = (index) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  return (
    <Box
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Append add-ons with keys your server expects
        addOns.forEach(({ name, price }) => {
          formData.append("addOnName", name);
          formData.append("addOnPrice", price || "0");
        });

        await onSubmit(formData);
      }}
      sx={{
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {submitLabel}
      </Typography>

      <input type="hidden" name="restaurantId" value={canteenId} />

      <TextField name="name" label="Menu Name" required fullWidth />

      <TextField
        name="price"
        label="Price"
        type="number"
        inputProps={{ step: "0.01" }}
        required
        fullWidth
      />

      <FormControl fullWidth required>
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" name="category" defaultValue="">
          <MenuItem value="APPETIZER">Appetizer</MenuItem>
          <MenuItem value="MAIN">Main</MenuItem>
          <MenuItem value="DESSERT">Dessert</MenuItem>
          <MenuItem value="DRINK">Drink</MenuItem>
          <MenuItem value="SNACK">Snack</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="description"
        label="Description"
        multiline
        rows={3}
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox name="isSpecial" />}
        label="Mark as Special"
      />

      <FormControlLabel
        control={<Checkbox name="isActive" defaultChecked />}
        label="In Stock"
      />

      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Add-ons
        </Typography>
        {addOns.map((addOn, i) => (
          <Stack key={i} direction="row" spacing={2} alignItems="center" mb={2}>
            <TextField
              label="Name"
              value={addOn.name}
              onChange={(e) => handleAddOnChange(i, "name", e.target.value)}
              required
              fullWidth
              name={`addOnName_${i}`} // Not needed for FormData, but okay to have
            />
            <TextField
              label="Price"
              type="number"
              inputProps={{ step: "0.01", min: 0 }}
              value={addOn.price}
              onChange={(e) => handleAddOnChange(i, "price", e.target.value)}
              required
              sx={{ width: 100 }}
              name={`addOnPrice_${i}`} // Not needed for FormData, but okay to have
            />
            <IconButton
              aria-label="remove add-on"
              onClick={() => removeAddOnField(i)}
              disabled={addOns.length === 1}
            >
              <Remove />
            </IconButton>
          </Stack>
        ))}

        <Button
          type="button"
          variant="outlined"
          startIcon={<Add />}
          onClick={addAddOnField}
          sx={{ mt: 1 }}
        >
          Add Another Add-on
        </Button>
      </Box>

      <SubmitButton label="Add memu"/>
    </Box>
  );
}
