// "use client";

// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "name", headerName: "Name", width: 130 },
//   { field: "email", headerName: "Email", width: 160 },
//   { field: "phone", headerName: "Phone", width: 160 },
//   { field: "password", headerName: "Password", width: 160 },
//   { field: "user_type", headerName: "User Type/Role", width: 160 },
// ];

// const rows = [
//   {
//     id: 1,
//     name: "Jon",
//     email: "snow@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "Restaurant Admin",
//   },
//   {
//     id: 2,
//     name: "Cersei",
//     email: "lannister@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 3,
//     name: "Jaime",
//     email: "jaime@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 4,
//     name: "Arya",
//     email: "arya@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 5,
//     name: "Daenerys",
//     email: "daenerys@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 6,
//     name: "Melisand",
//     email: "melisandre@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 7,
//     name: "Ferrara",
//     email: "ferrara@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 8,
//     name: "Rossini",
//     email: "rossini@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
//   {
//     id: 9,
//     name: "Harvey",
//     email: "harvey@gmail.com",
//     phone: 9774455040,
//     password: "xxxxxxx",
//     user_type: "user",
//   },
// ];

// const paginationModel = { page: 0, pageSize: 5 };

// export default function ManageUserPageTable() {
//   return (
//     <Paper sx={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// }

"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Paper, Box, IconButton } from "@mui/material";
import { Edit, Remove } from "@mui/icons-material";
// import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    hideable: true, // Allows hiding on small screens
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1, // Responsive width
    minWidth: 120,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    minWidth: 150,
    hideable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    width: 130,
    hideable: true,
  },
  {
    field: "user_type",
    headerName: "Role",
    flex: 1,
    width: 150,
    renderCell: (params) => (
      <Box
        sx={{
          bgcolor: params.value.includes("Admin")
            ? "primary.light"
            : "grey.200",
          px: 1,
          borderRadius: 1,
          fontSize: "0.75rem",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Action",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <Link href="/admin/manageuser/123">
          <IconButton size="small" color="primary">
            <Edit fontSize="small" />
          </IconButton>
        </Link>
        <IconButton size="small" color="error">
          <Remove fontSize="small" />
        </IconButton>
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1,
    name: "Jon",
    email: "snow@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "Admin",
  },
  {
    id: 2,
    name: "Cersei",
    email: "lannister@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "Admin",
  },
  {
    id: 3,
    name: "Jaime",
    email: "jaime@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
  {
    id: 4,
    name: "Arya",
    email: "arya@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
  {
    id: 5,
    name: "Daenerys",
    email: "daenerys@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
  {
    id: 6,
    name: "Melisand",
    email: "melisandre@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
  {
    id: 7,
    name: "Ferrara",
    email: "ferrara@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
  {
    id: 8,
    name: "Rossini",
    email: "rossini@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
  {
    id: 9,
    name: "Harvey",
    email: "harvey@gmail.com",
    phone: 9774455040,
    password: "xxxxxxx",
    user_type: "user",
  },
];

export default function ManageUserPageTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Paper
      sx={{
        height: "70vh",
        // width: "100%",
        width: "82vw",
        overflow: "hidden",
        p: isSmallScreen ? 0.5 : 2,
        [`.${gridClasses.main}`]: {
          borderRadius: 1,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={{
          id: !isSmallScreen,
          email: !isSmallScreen,
          phone: !isSmallScreen,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        density={isSmallScreen ? "compact" : "standard"}
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: theme.palette.grey[100],
          },
        }}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
