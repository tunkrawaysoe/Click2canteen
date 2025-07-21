"use client";

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
  Box,
} from "@mui/material";

export default function OrderItemsTable({ orderItems }) {
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

  const totalAll = orderItems
    ? orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
    : 0;

  return (
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
                <TableCell align="right">{index + 1}</TableCell>{" "}
                {/* Align No right */}
                <TableCell>
                  <Typography>{item.menu?.name || "Unknown"}</Typography>
                  {item.orderItemAddOns?.length > 0 && (
                    <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
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
          <TableRow>
            <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
              Total
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              {totalAll.toLocaleString()} MMK
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
