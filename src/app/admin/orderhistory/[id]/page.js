"use client";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";

//Validation Shcema to validate client request
const schema = yup.object().shape({
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Pending", "Delivered"], "Invalid Status"),
});

const Status = [
  { value: "pendig", label: "Pending" },
  { value: "delivered", label: "Delivered" },
];

export default function FoodOrderDetail() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    // console.log("Name Input Data", formData.name);
    // try {
    //   console.log("formData", formData);
    //   const bodyData = {
    //     name: formData.name,
    //     father_name: formData.father_name,
    //     gender: formData.gender,
    //     age: formData.age,
    //     // dob: dayjs(formData.dob).format("YYYY-MM-DD"),
    //     phone: formData.phone,
    //     address: formData.address,
    //     major: formData.major,
    //   };
    //   const response = await axios.post("/api/students", bodyData);
    //   reset();
    //   console.log("Successfully Saved.");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Box
      padding={2}
      component="form"
      width="60%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Link href="/admin/orderhistory/">
        <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
          Back
        </Button>
      </Link>

      <Stack spacing={2}>
        <Typography variant="h4">Order Detail</Typography>
        <TextField
          disabled
          label="Order ID"
          fullWidth
          {...register("orderid")}
          error={!!errors.orderid}
          helperText={errors.orderid?.message}
        />
        <TextField
          disabled
          label="Menu Item ID"
          fullWidth
          {...register("menuitemid")}
          error={!!errors.menuitemid}
          helperText={errors.menuitemid?.message}
        />
        <TextField
          disabled
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          disabled
          label="Quantity"
          fullWidth
          {...register("quantity")}
          error={!!errors.quantity}
          helperText={errors.quantity?.message}
        />
        <TextField
          disabled
          label="Price"
          fullWidth
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        {/* Status */}
        <FormControl fullWidth error={!!errors.status}>
          <InputLabel id="status-label">Status</InputLabel>
          <Controller
            name="status"
            control={control}
            error={!!errors.status}
            render={({ field }) => (
              <Select
                disabled
                {...field}
                labelId="status-label"
                label="Status"
                value={field.value || ""} //Ensure Controlled value
              >
                {Status.map((status, index) => (
                  <MenuItem key={index} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.status?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
