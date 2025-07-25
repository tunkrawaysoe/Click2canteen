import { notFound } from "next/navigation";
import { getCartAction } from "@/actions/cart";
import prisma from "@/lib/prisma";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import ConfirmOrderButton from "@/components/buttons/ConfirmOrderButton";

export default async function PlaceOrderPage({ searchParams }) {
  const { userId } = await searchParams;

  const cartItems = await getCartAction(userId);
  if (!cartItems?.length) return notFound();

  const enrichedCart = (
    await Promise.all(
      cartItems.map(async (item) => {
        const menu = await prisma.menu.findUnique({
          where: { id: item.menuId },
          include: { addOns: true },
        });
        return menu ? { ...item, menu } : null;
      })
    )
  ).filter(Boolean);

  if (!enrichedCart.length) return notFound();

  let grandTotal = 0;

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
          grandTotal += totalForItem;

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
                            label={`${addon.name} (+${addon.price.toLocaleString()} MMK)`}
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

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Total: {grandTotal.toLocaleString()} MMK
        </Typography>
        <ConfirmOrderButton userId={userId} />
      </Stack>
    </Box>
  );
}
