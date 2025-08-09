"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Chip,
  Typography,
  Dialog,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function OrderItemsTable({
  orderItems,
  payMentMethod,
  payMentUrl,
  serviceType,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const calculateItemTotal = (item) => {
    const addonsTotal = item.orderItemAddOns?.reduce(
      (sum, addon) => sum + (addon.addOn?.price || 0),
      0
    );
    return (
      (item.price || 0) * (item.quantity || 0) +
      addonsTotal * (item.quantity || 0)
    );
  };

  const totalAll =
    orderItems?.reduce((sum, item) => sum + calculateItemTotal(item), 0) || 0;

  return (
    <>
      {/* Table for order items */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {[
                "No",
                "Menu Name",
                "Unit Price (MMK)",
                "Quantity",
                "Total Price (MMK)",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold" }}
                  align={header === "Menu Name" ? "left" : "right"}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {(orderItems || []).map((item, index) => {
              const addonsTotal = item.orderItemAddOns?.reduce(
                (sum, addon) => sum + (addon.addOn?.price || 0),
                0
              );
              const unitPriceWithAddons = (item.price || 0) + addonsTotal;
              const totalPrice = unitPriceWithAddons * (item.quantity || 0);

              return (
                <TableRow key={item.id} hover>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell>
                    <Typography>{item.menu?.name || "Unknown"}</Typography>
                    {item.orderItemAddOns?.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={0.5}
                        flexWrap="wrap"
                      >
                        {item.orderItemAddOns.map((addonLink) => (
                          <Chip
                            key={addonLink.id}
                            label={`${
                              addonLink.addOn?.name
                            } (+${addonLink.addOn?.price.toLocaleString()} MMK)`}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {unitPriceWithAddons.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{item.quantity || 0}</TableCell>
                  <TableCell align="right">
                    {totalPrice.toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Total row */}
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
              <TableCell align="right" colSpan={4} sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {totalAll.toLocaleString()} MMK
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Responsive Order Summary */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }} // stack on mobile, row on desktop
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mt={2}
        p={2}
        sx={{
          backgroundColor: "#fafafa",
          borderRadius: 2,
          border: "1px solid #eee",
        }}
      >
        <Typography>
          <strong>Service Type:</strong> {serviceType}
        </Typography>

        <Typography>
          <strong>Payment Method:</strong> {payMentMethod?.toUpperCase() || "N/A"}
        </Typography>

        {payMentMethod?.toUpperCase() === "KBZPAY" && payMentUrl ? (
          <Image
            src={payMentUrl}
            alt="KBZPay QR Code"
            width={60}
            height={60}
            style={{
              border: "1px solid #ccc",
              borderRadius: 6,
              cursor: "pointer",
            }}
            onClick={handleOpen}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No payment image
          </Typography>
        )}
      </Box>

      {/* Modal Dialog for Payment Image */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="payment-qr-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 24,
            p: 2,
            backgroundColor: "#fff",
            position: "relative",
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
      >
        <IconButton
          aria-label="Close payment modal"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: "50%",
            padding: 1,
            zIndex: 999,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        {payMentUrl ? (
          <Box
            component="img"
            src={payMentUrl}
            alt="Payment QR Code Large"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
              mx: "auto",
              display: "block",
              userSelect: "none",
            }}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={4}
          >
            No payment QR code available.
          </Typography>
        )}
      </Dialog>
    </>
  );
}
