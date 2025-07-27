import { notFound } from "next/navigation";
import { getCartAction } from "@/actions/cart";
import { enrichCart, calculateTotal } from "@/lib/data/cart/enrichedcart";
import PaymentSelector from "@/components/PaymentSelector";

import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  Chip,
  Grid,
} from "@mui/material";

export default async function PlaceOrderPage({ searchParams }) {
  const { userId } = await searchParams;

  const cartItems = await getCartAction(userId);
  if (!cartItems?.length) return notFound();

  const enrichedCart = await enrichCart(cartItems);
  if (!enrichedCart.length) return notFound();

  const grandTotal = calculateTotal(enrichedCart);

  // Get QR Code URL from first menu item's restaurant
  const qrCodeUrl = enrichedCart[0].menu.restaurant.qrCodeUrl;

  return (
    <Box maxWidth="800px" mx="auto" my={5} px={2}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        🧾 Order Summary
      </Typography>

      <Stack spacing={3}>
        {enrichedCart.map((item, idx) => {
          const selectedAddOns = item.addOns.map((id) =>
            item.menu.addOns.find((a) => a.id === id)
          );

          const addonTotal = selectedAddOns.reduce(
            (sum, addon) => sum + (addon?.price || 0),
            0
          );

          const itemPrice = item.menu.price + addonTotal;
          const totalForItem = itemPrice * item.quantity;

          return (
            <Paper
              key={idx}
              elevation={2}
              sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Typography variant="h6" fontWeight={600}>
                    {item.menu.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  {selectedAddOns.length > 0 && (
                    <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                      {selectedAddOns.map((addon) =>
                        addon ? (
                          <Chip
                            key={addon.id}
                            label={`${
                              addon.name
                            } (+${addon.price.toLocaleString()} MMK)`}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ) : null
                      )}
                    </Stack>
                  )}
                </Grid>

                <Grid item xs={12} sm={4} textAlign="right">
                  <Typography fontWeight="bold" color="primary">
                    {totalForItem.toLocaleString()} MMK
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <PaymentSelector
        userId={userId}
        grandTotal={grandTotal}
        qrCodeUrl={qrCodeUrl}
      />
    </Box>
  );
}
