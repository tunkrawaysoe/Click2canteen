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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";

//Validation Shcema to validate client request
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  father_name: yup.string().required("Father Name is required"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Invalid Gender"),
  age: yup.number().required("Age is required"),
  dob: yup.date().required("Date of birth is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  major: yup.string().required("Major is required"),
});

const Available = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "no" },
];

export default function CreateMenu() {
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
    try {
      console.log("formData", formData);
      const bodyData = {
        name: formData.name,
        father_name: formData.father_name,
        gender: formData.gender,
        age: formData.age,
        dob: dayjs(formData.dob).format("YYYY-MM-DD"),
        phone: formData.phone,
        address: formData.address,
        major: formData.major,
      };
      const response = await axios.post("/api/students", bodyData);
      reset();
      console.log("Successfully Saved.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      padding={2}
      component="form"
      width="60%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Link href="/admin/uploadmenu/">
        <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
          Back
        </Button>
      </Link>

      <Stack spacing={2}>
        <Typography variant="h4">Add a Menu</Typography>
        <TextField
          label="Category"
          fullWidth
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
        />
        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Image"
          fullWidth
          {...register("image")}
          error={!!errors.image}
          helperText={errors.image?.message}
        />
        <TextField
          label="Price"
          fullWidth
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <TextField
          label="Description"
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        {/* Gender */}
        <FormControl fullWidth error={!!errors.gender}>
          <InputLabel id="available-label">Available</InputLabel>
          <Controller
            name="available"
            control={control}
            error={!!errors.available}
            render={({ field }) => (
              <Select
                {...field}
                labelId="available-label"
                label="Available"
                value={field.value || ""} //Ensure Controlled value
              >
                {Available.map((available, index) => (
                  <MenuItem key={index} value={available.value}>
                    {available.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.available?.message}</FormHelperText>
        </FormControl>

        {/* DOB */}
        {/* <FormControl fullWidth>
          <Controller
            name="dob"
            control={control}
            error={!!errors.dob}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                value={field.value ? dayjs(field.value, "YYYY/MM/DD") : null}
                onChange={(e) => field.onChange(e?.format("YYYY/MM/DD"))}
                format="DD/MM/YYYY"
                label="DOB"
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error?.message,
                  },
                }}
              />
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl> */}
        <Button type="submit" variant="contained">
          Upload
        </Button>
      </Stack>
    </Box>
  );
}
