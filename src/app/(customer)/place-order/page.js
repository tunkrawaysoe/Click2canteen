import { notFound } from "next/navigation";
import { getCartAction } from "@/actions/cart";
import { enrichCart, calculateTotal } from "@/lib/data/cart/enrichedcart";

import PaymentSelector from "@/components/PaymentSelector";
import { Box, Typography, Paper, Divider, Chip, Stack } from "@mui/material";
import BackButton from "@/components/buttons/BackButton";
import Image from "next/image";

export default async function PlaceOrderPage({ searchParams }) {
  const { userId } = await searchParams;

  const cartItems = await getCartAction(userId);
  if (!cartItems?.length) return notFound();

  const enrichedCart = await enrichCart(cartItems);
  if (!enrichedCart.length) return notFound();

  const grandTotal = calculateTotal(enrichedCart);
  const qrCodeUrl = enrichedCart[0].menu.restaurant.qrCodeUrl;
  const kpayPhones = enrichedCart[0].menu.restaurant.kpayPhones;

  return (
    <Box maxWidth="900px" mx="auto" my={5} px={2}>
      <BackButton />

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#fff",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>

        <Divider sx={{ mb: 2 }} />

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
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                pb: 2,
                mb: 2,
                borderBottom:
                  idx !== enrichedCart.length - 1 ? "1px solid #eee" : "none",
              }}
            >
              {/* Fixed Size Image Box */}
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  flexShrink: 0,
                  borderRadius: 2,
                  overflow: "hidden",
                  backgroundColor: "#f0f0f0",
                }}
              >
                {item.menu.imageUrl && (
                  <Image
                    src={item.menu.imageUrl}
                    alt={item.menu.name}
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>

              {/* Item Details */}
              <Box flex={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.menu.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>

                {selectedAddOns.length > 0 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    mt={1}
                    flexWrap="wrap"
                    rowGap={0.5}
                  >
                    {selectedAddOns.map(
                      (addon) =>
                        addon && (
                          <Chip
                            key={addon.id}
                            label={`${
                              addon.name
                            } (+${addon.price.toLocaleString()} MMK)`}
                            size="small"
                            sx={{
                              borderRadius: "6px",
                              backgroundColor: "#f5f5f5",
                            }}
                          />
                        )
                    )}
                  </Stack>
                )}
              </Box>

              {/* Price */}
              <Box textAlign="right" minWidth={120}>
                <Typography fontWeight="bold" color="primary">
                  {totalForItem.toLocaleString()} MMK
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.menu.price.toLocaleString()} MMK base
                </Typography>
              </Box>
            </Box>
          );
        })}

        {/* Grand Total */}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            Total
          </Typography>
          <Typography variant="h6" fontWeight={700} color="primary">
            {grandTotal.toLocaleString()} MMK
          </Typography>
        </Box>
      </Paper>

      {/* Payment */}
      <PaymentSelector
        userId={userId}
        grandTotal={grandTotal}
        qrCodeUrl={qrCodeUrl}
        kpayPhones={kpayPhones}
      />
    </Box>
  );
}
