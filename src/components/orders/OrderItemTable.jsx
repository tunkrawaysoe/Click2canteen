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
  DialogContent,
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
                "Service Type",
                "Payment Method",
                "Payment Image",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold" }}
                  align={
                    [
                      "Menu Name",
                      "Service Type",
                      "Payment Method",
                      "Payment Image",
                    ].includes(header)
                      ? "left"
                      : "right"
                  }
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

              const isLastRow = index === orderItems.length - 1;

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
            <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
              <TableCell align="right" colSpan={4} sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>

              {/* Total Price */}
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {totalAll.toLocaleString()} MMK
              </TableCell>

              {/* Service Type */}
              <TableCell>
                <Typography>{serviceType}</Typography>
              </TableCell>

              {/* Payment Method */}
              <TableCell>
                <Typography fontWeight="bold">
                  {payMentMethod?.toUpperCase() || "N/A"}
                </Typography>
              </TableCell>

              {/* Payment Image */}
              <TableCell>
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
                    N/A
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

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
            backgroundColor: "fff",
            position: "relative",
          },
        }}
      >
        <IconButton
          aria-label="Close payment modal"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: (theme) => theme.palette.grey[600],
            zIndex: 10,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          }}
          size="large"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>

        {payMentUrl ? (
          <Box
            component="img"
            src={payMentUrl}
            alt="Payment QR Code Large"
            sx={{
              width: "100%",
              maxWidth: 400,
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
