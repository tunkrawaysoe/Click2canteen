// export const metadata = {
//   title: "Admin Create Page", // Changes browser tab title
//   description: "View and manage all admin",
// };

// export default function AdminCreatePage() {
//   return (
//     <div>
//       <h1>Admin Create Page</h1>
//       {/* Admin content here */}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";

const userTypes = ["Admin", "Staff", "Student"];

export default function CreateAdminUserPage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    user_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: Send formData to backend
  };

  const router = useRouter();

  const handleBack = () => {
    router.push("/admin/users");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 0.5 }}>
        <Button onClick={handleBack} variant="outlined" sx={{ mb: 2 }}>
          ← Back
        </Button>
        <Typography variant="h5" gutterBottom>
          Create Admin User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="ID"
            name="id"
            type="number"
            value={formData.id}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="User Type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
          >
            {userTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Create User
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
