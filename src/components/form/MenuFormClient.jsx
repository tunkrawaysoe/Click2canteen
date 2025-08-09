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
import { UploadDropzone } from "@/lib/utils/uploadthing";
import BackButton from "../buttons/BackButton";

export default function MenuFormClient({
  canteenId,
  onSubmit,
  submitLabel,
  defaultValues = {},
}) {
  const [addOns, setAddOns] = useState(
    defaultValues.addOns?.length > 0
      ? defaultValues.addOns
      : [{ name: "", price: "" }]
  );

  const [imageUrl, setImageUrl] = useState(defaultValues.image || "");

  const   handleAddOnChange = (index, field, value) => {
    const updated = [...addOns];
    updated[index][field] = value;
    setAddOns(updated);
  };

  const addAddOnField = () => {
    setAddOns([...addOns, { name: "", price: "" }]);
  };

  const removeAddOnField = (index) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  return (
    <>
      <Box sx={{ maxWidth: 600, mx: "auto", mb: 2 }}>
        <BackButton />
      </Box>

      <form
        action={onSubmit}
        style={{
          maxWidth: 600,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <input type="hidden" name="restaurantId" value={canteenId} />

        {defaultValues.id && (
          <input type="hidden" name="menuId" value={defaultValues.id} />
        )}

        <input type="hidden" name="image" value={imageUrl} />

        <TextField
          name="name"
          label="Menu Name"
          required
          fullWidth
          defaultValue={defaultValues.name}
        />

        <TextField
          name="price"
          label="Price"
          inputProps={{ step: "0.01" }}
          required
          fullWidth
          defaultValue={defaultValues.price}
        />

        <FormControl fullWidth required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            label="Category"  // <-- This is important
            labelId="category-label"
            name="category"
            defaultValue={defaultValues.category || ""}
          >
            <MenuItem value="APPETIZER">Appetizer</MenuItem>
            <MenuItem value="MAIN">Main</MenuItem>
            <MenuItem value="DESSERT">Dessert</MenuItem>
            <MenuItem value="DRINK">Drink</MenuItem>
            <MenuItem value="SNACK">Snack</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Upload Image
          </Typography>

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
            }}
            onUploadError={(err) => {
              console.error("Upload error:", err);
              alert("Image upload failed");
            }}
          />

          {imageUrl && (
            <>
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "0.5rem",
                  marginTop: "1rem",
                }}
              />
              <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
                Image uploaded successfully!
              </Typography>
            </>
          )}
        </Box>

        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          fullWidth
          defaultValue={defaultValues.description}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isSpecial"
              defaultChecked={Boolean(defaultValues.isSpecial)}
            />
          }
          label="Mark as Special"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              defaultChecked={
                defaultValues.isActive === undefined
                  ? true
                  : Boolean(defaultValues.isActive)
              }
            />
          }
          label="In Stock"
        />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Add-ons
          </Typography>
          {addOns.map((addOn, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
              mb={2}
            >
              <TextField
                label="Name"
                name="addOnName"
                value={addOn.name}
                onChange={(e) =>
                  handleAddOnChange(index, "name", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Price"
                name="addOnPrice"
                inputProps={{ step: "0.01", min: 0 }}
                value={addOn.price}
                onChange={(e) =>
                  handleAddOnChange(index, "price", e.target.value)
                }
                sx={{ width: 100 }}
              />
              <IconButton
                aria-label="Remove add-on"
                onClick={() => removeAddOnField(index)}
                disabled={addOns.length === 1}
              >
                <Remove />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="outlined"
            onClick={addAddOnField}
            startIcon={<Add />}
            sx={{ mt: 1 }}
          >
            Add Another Add-on
          </Button>
        </Box>

        <SubmitButton label={submitLabel} />
      </form>
    </>
  );
}
