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
} from "@mui/material";
import ConfirmOrderButton from "@/components/ConfirmOrderButton";

export default async function PlaceOrderPage({ searchParams }) {
  const userId = searchParams?.userId || "guest";
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
    <Box maxWidth="700px" mx="auto" my={4} px={2}>
      <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center">
        Order Summary
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
              elevation={3}
              sx={{ p: 2, borderRadius: 2, position: "relative" }}
            >
              <Typography variant="h6" fontWeight="600" gutterBottom noWrap>
                {item.menu.name} x {item.quantity}
              </Typography>

              {selectedAddOns.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                  {selectedAddOns.map((addon) => (
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

              <Divider sx={{ mb: 1 }} />

              <Typography variant="body1" fontWeight="bold">
                Item total: {totalForItem.toLocaleString()} MMK
              </Typography>
            </Paper>
          );
        })}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" fontWeight="bold" textAlign="right" mb={3}>
        Grand Total: {grandTotal.toLocaleString()} MMK
      </Typography>

      <ConfirmOrderButton userId={userId} />
    </Box>
  );
}
