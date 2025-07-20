"use client";

import { removeFromCartAction, updateCartQuantity } from "@/actions/cart";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Stack,
  Chip,
  Box,
  Divider,
  Button,
} from "@mui/material";

export default function CartListClient({ cartItems, userId }) {
  const router = useRouter();
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80";

  async function handleRemove(menuId) {
    await removeFromCartAction(userId, menuId);
    window.dispatchEvent(new Event("cartUpdated"));
    router.refresh();
  }

  async function handleQuantityChange(menuId, value) {
    const quantity = parseInt(value);
    if (quantity > 0) {
      await updateCartQuantity(userId, menuId, quantity);
      window.dispatchEvent(new Event("cartUpdated"));
      router.refresh();
    }
  }

  return (
    <>
      <Stack spacing={3}>
        {cartItems.map((item, idx) => {
          if (!item.menu) {
            return (
              <Typography key={idx} color="error">
                Menu not found (ID: {item.menuId})
              </Typography>
            );
          }

          const itemAddons = item.addOns
            .map((id) => item.menu.addOns.find((a) => a.id === id))
            .filter(Boolean);

          const basePrice = item.menu.price;
          const addonTotal = itemAddons.reduce((sum, a) => sum + (a?.price || 0), 0);
          const itemPrice = basePrice + addonTotal;

          return (
            <Card
              key={item.menuId + idx}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                height: { xs: "auto", sm: 220 },
              }}
            >
              {/* Image section */}
              <CardMedia
                sx={{
                  position: "relative",
                  width: { xs: "100%", sm: "33.33%" },
                  height: { xs: 200, sm: "100%" },
                  flexShrink: 0,
                }}
              >
                <Image
                  src={item.menu.imageUrl || defaultImageUrl}
                  alt={item.menu.name}
                  fill
                  sizes="(max-width: 600px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>

              {/* Content section */}
              <CardContent
                sx={{
                  width: { xs: "100%", sm: "66.66%" },
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  py: 2,
                }}
              >
                {/* Remove Button */}
                <IconButton
                  aria-label="Remove item"
                  onClick={() => handleRemove(item.menuId)}
                  sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}
                >
                  <Trash2 size={20} strokeWidth={2} />
                </IconButton>

                <Box>
                  <Typography variant="h6" noWrap>
                    {item.menu.name}
                  </Typography>
                  {item.menu.restaurant?.name && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      from <strong>{item.menu.restaurant.name}</strong>
                    </Typography>
                  )}

                  {/* Quantity Input */}
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="body2">Quantity:</Typography>
                    <TextField
                      type="number"
                      size="small"
                      inputProps={{ min: 1 }}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.menuId, e.target.value)
                      }
                      sx={{ width: 80 }}
                    />
                  </Stack>

                  {/* Add-ons */}
                  {itemAddons.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                      {itemAddons.map((addon) => (
                        <Chip
                          key={addon.id}
                          label={`${addon.name} (+${addon.price.toLocaleString()} MMK)`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  )}
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Price Summary */}
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Regular price:
                    </Typography>
                    <Typography variant="body2">
                      {basePrice.toLocaleString()} MMK
                    </Typography>
                  </Stack>

                  {addonTotal > 0 && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Add-ons:
                      </Typography>
                      <Typography variant="body2">
                        {addonTotal.toLocaleString()} MMK
                      </Typography>
                    </Stack>
                  )}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ fontWeight: "bold", fontSize: "1rem", mt: 1 }}
                  >
                    <Typography>Total:</Typography>
                    <Typography>
                      {(itemPrice * item.quantity).toLocaleString()} MMK
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {/* Place Order Button */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push(`/place-order?userId=${userId}`)}
        >
          Place Order
        </Button>
      </Box>
    </>
  );
}
