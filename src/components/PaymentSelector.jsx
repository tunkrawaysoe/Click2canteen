"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Stack,
  Paper,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} from "@mui/material";
import ConfirmOrderButton from "@/components/buttons/ConfirmOrderButton";

import StorefrontIcon from "@mui/icons-material/Storefront";

import cashImg from "../../public/logo/cash.png";
import kbzImg from "../../public/logo/kbz.png";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { DirectionsBike } from "@mui/icons-material";

const paymentOptions = [
  { value: "cash", label: "Cash", imgSrc: cashImg },
  { value: "kbzpay", label: "KBZ Pay", imgSrc: kbzImg },
];

const serviceOptions = [
  {
    value: "SELF_SERVICE",
    label: "Self Service",
    icon: <StorefrontIcon sx={{ mr: 1 }} />,
  },
  {
    value: "DELIVERY",
    label: "Delivery",
    icon: <DirectionsBike sx={{ mr: 1 }} />,
  },
];

export default function PaymentSelector({
  userId,
  grandTotal,
  qrCodeUrl,
  kpayPhones = [],
}) {
  const [serviceType, setServiceType] = useState("SELF_SERVICE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentProofUrl, setPaymentProofUrl] = useState(null);

  return (
    <Box my={4} textAlign="center" maxWidth={600} mx="auto">
      {/* Centered Service Type Selection with Icons */}
      <Box mb={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6" mb={2}>
          Select Service Type
        </Typography>

        <RadioGroup
          row
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          {serviceOptions.map(({ value, label, icon }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={
                <Box display="flex" alignItems="center">
                  {icon}
                  {label}
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Conditional Inputs for Delivery */}
      {serviceType === "DELIVERY" && (
        <>
          <Box mb={3}>
            <TextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09xxxxxxxxx"
              variant="outlined"
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Delivery Address"
              fullWidth
              multiline
              minRows={2}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address"
              variant="outlined"
              required
            />
          </Box>
        </>
      )}

      {/* Payment Method Selection */}
      <Typography variant="h6" mb={3}>
        💳 Choose Payment Method
      </Typography>

      <Stack spacing={2} mb={5} alignItems="center" maxWidth={500} mx="auto">
        {paymentOptions.map(({ value, label, imgSrc }) => {
          const selected = paymentMethod === value;

          return (
            <Box
              key={value}
              onClick={() => {
                setPaymentMethod(value);
                if (value !== "kbzpay") setPaymentProofUrl(null);
              }}
              sx={{
                border: selected ? "3px solid #1976d2" : "2px solid #ccc",
                borderRadius: 2,
                padding: 1.5,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                width: "100%",
                userSelect: "none",
                transition: "border-color 0.3s",
                backgroundColor: selected ? "#e3f2fd" : "transparent",
                "&:hover": {
                  borderColor: "#1976d2",
                },
              }}
            >
              <Image
                src={imgSrc}
                alt={label}
                width={48}
                height={48}
                style={{ objectFit: "contain", marginRight: 12 }}
              />
              <Typography
                variant="body1"
                fontWeight={selected ? "bold" : "normal"}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* QR Code for KBZ Pay with phone numbers */}
      {paymentMethod === "kbzpay" && qrCodeUrl && (
        <Box
          mt={3}
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
        >
          <Typography variant="subtitle1" mb={2} textAlign="center">
            You can pay by scanning this KBZPay QR Code
            <br />
            or by using one of these KBZ Pay numbers:
          </Typography>
          <Image
            src={qrCodeUrl}
            alt="KBZ Pay QR Code"
            width={500}
            height={500}
            style={{ borderRadius: 16, border: "2px solid #ccc" }}
          />

          {kpayPhones.length > 0 && (
            <Box mt={2} textAlign="center">
              <Typography variant="body1" fontWeight="bold" mb={1}>
                KBZ Numbers:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                flexWrap="wrap"
              >
                {kpayPhones.filter(Boolean).map((phone, idx) => (
                  <Chip
                    key={idx}
                    label={phone}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "medium" }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}

      {/* Upload Payment Proof */}
      {paymentMethod === "kbzpay" && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          gap={3}
          flexWrap="wrap"
          mb={4}
        >
          <Box flex="1 1 300px" minWidth={280} maxWidth={300}>
            <Typography variant="subtitle1" mb={1} textAlign="left">
              Upload your payment proof:
            </Typography>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const url = res?.[0]?.fileUrl || res?.[0]?.url || null;
                if (url) {
                  setPaymentProofUrl(url);
                  alert("Upload successful!");
                } else {
                  alert("Upload failed. Please try again.");
                }
              }}
              onUploadError={(error) => {
                alert(`Upload error: ${error.message}`);
              }}
            />
          </Box>

          {paymentProofUrl && (
            <Paper
              sx={{
                borderRadius: 2,
                border: "1px solid #ccc",
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src={paymentProofUrl}
                alt="Payment Proof"
                width={200}
                height={200}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            </Paper>
          )}
        </Box>
      )}

      {/* Total & Confirm Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={6}
      >
        <Typography variant="h5" fontWeight="bold">
          Total: {grandTotal.toLocaleString()} MMK
        </Typography>
        <ConfirmOrderButton
          userId={userId}
          paymentMethod={paymentMethod}
          paymentProofUrl={paymentProofUrl}
          phoneNumber={serviceType === "DELIVERY" ? phoneNumber : null}
          deliveryAddress={serviceType === "DELIVERY" ? deliveryAddress : null}
          serviceType={serviceType}
        />
      </Stack>
    </Box>
  );
}
