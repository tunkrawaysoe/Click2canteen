"use client";

import { useState } from "react";
import Image from "next/image";
import { addToCartAction } from "@/actions/cart";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  Button,
  Stack,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFormStatus } from "react-dom";
import { ArrowLeft } from "lucide-react";

export default function MenuDetailClient({ menu, cart, userId }) {
  console.log("userIdd ",userId)
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { pending } = useFormStatus();
  const router = useRouter();

  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  const handleAddOnChange = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = async () => {
    try {
      if (cart?.length > 0) {
        const existingRestaurantId = cart[0].menu?.restaurantId;
        if (
          existingRestaurantId &&
          existingRestaurantId !== menu.restaurantId
        ) {
          showError("You can only add items from one restaurant at a time.");
          return;
        }
      }

      await addToCartAction(userId, menu.id, quantity, selectedAddons);
      window.dispatchEvent(new Event("cartUpdated"));
      router.back();
    } catch (err) {
      console.error("Failed to add to cart:", err);
      showError("Failed to add to cart. Please try again.");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 2, mt: 4 }}>
      {/* Back Button */}
      <Box className="mb-6">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowLeft />}
          onClick={() => router.back()}
          sx={{
            textTransform: "none",
            borderRadius: 20,
            px: 3,
            py: 1,
            backgroundColor: "#0D47A1",
            "&:hover": { backgroundColor: "#0B3C91" },
          }}
        >
          Back to Menu
        </Button>
      </Box>

      {/* Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 300,
          borderRadius: 2,
          overflow: "hidden",
          mb: 3,
        }}
      >
        <Image
          src={menu.imageUrl || defaultImageUrl}
          alt={menu.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Name & Description */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {menu.name}
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        {menu.description}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Price: {menu.price.toLocaleString()} MMK
      </Typography>

      {/* Quantity */}
      <Box sx={{ mt: 3 }}>
        <Typography fontWeight={500}>Quantity</Typography>
        <TextField
          type="number"
          size="small"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          inputProps={{ min: 1 }}
          sx={{ mt: 1, width: 80 }}
        />
      </Box>

      {/* Add-ons */}
      {menu.addOns?.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography fontWeight={500} gutterBottom>
            Add-ons
          </Typography>
          <FormGroup>
            {menu.addOns.map((addon) => (
              <FormControlLabel
                key={addon.id}
                control={
                  <Checkbox
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => handleAddOnChange(addon.id)}
                  />
                }
                label={`${addon.name} (+${addon.price.toLocaleString()} MMK)`}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      {/* Error */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        variant="contained"
        fullWidth
        disabled={pending}
        sx={{
          mt: 4,
          py: 1.5,
          fontWeight: 600,
          fontSize: "1rem",
          background: "linear-gradient(to bottom, #00022E, #001D51)",
          "&:hover": {
            opacity: 0.9,
            background: "linear-gradient(to bottom, #00022E, #001D51)",
          },
          "&.Mui-disabled": {
            background: "#ccc",
            color: "#666",
          },
        }}
      >
        {pending ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <CircularProgress size={20} color="inherit" />
            <span>Adding...</span>
          </Stack>
        ) : (
          "Add to Cart"
        )}
      </Button>
    </Paper>
  );
}
