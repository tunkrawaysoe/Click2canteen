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
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["admin", "user"], "Invalid Role"),
});

const Role = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

export default function UserEdit() {
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
      <Link href="/admin/manageuser/">
        <Button type="submit" variant="outlined" sx={{ mb: 3 }}>
          Back
        </Button>
      </Link>

      <Stack spacing={2}>
        <Typography variant="h4">Edit User</Typography>
        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Phone"
          fullWidth
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        {/* Role */}
        <FormControl fullWidth error={!!errors.role}>
          <InputLabel id="role-label">Role</InputLabel>
          <Controller
            name="role"
            control={control}
            error={!!errors.role}
            render={({ field }) => (
              <Select
                {...field}
                labelId="gender-label"
                label="Role"
                value={field.value || ""} //Ensure Controlled value
              >
                {Role.map((role, index) => (
                  <MenuItem key={index} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.role?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained">
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
