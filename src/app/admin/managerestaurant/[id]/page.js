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
import axios from "axios";

//Validation Shcema to validate client request
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  openinghour: yup.string().required("Opening Hour is required"),
  contactphonenumber: yup.string().required("Contact Phone Number is required"),
  isactive: yup
    .string()
    .required("Is Active is required")
    .oneOf(["open", "close"], "Invalid Active"),
});

const IsActive = [
  { value: "open", label: "Open" },
  { value: "close", label: "Close" },
];

export default function RestaurantEdit() {
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
      <Link href="/admin/managerestaurant/">
        <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
          Back
        </Button>
      </Link>

      <Stack spacing={2}>
        <Typography variant="h4">Edit Restaurant</Typography>
        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Description"
          fullWidth
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          label="Location"
          fullWidth
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <TextField
          label="Opening Hour"
          fullWidth
          {...register("openinghour")}
          error={!!errors.openinghour}
          helperText={errors.openinghour?.message}
        />
        <TextField
          label="Contact Phone Number"
          fullWidth
          {...register("contactphonenumber")}
          error={!!errors.contactphonenumber}
          helperText={errors.contactphonenumber?.message}
        />

        {/* Is Active */}
        <FormControl fullWidth error={!!errors.isactive}>
          <InputLabel id="isactive-label">Is Active</InputLabel>
          <Controller
            name="isactive"
            control={control}
            error={!!errors.isactive}
            render={({ field }) => (
              <Select
                {...field}
                labelId="isactive-label"
                label="Is Active"
                value={field.value || ""} //Ensure Controlled value
              >
                {IsActive.map((isactive, index) => (
                  <MenuItem key={index} value={isactive.value}>
                    {isactive.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.isactive?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
