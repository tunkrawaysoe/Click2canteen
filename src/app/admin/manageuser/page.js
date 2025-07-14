"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Paper, Box, IconButton, Typography } from "@mui/material";
import { Edit, Remove } from "@mui/icons-material";
import Link from "next/link";

const columns = [
  { field: "id", headerName: "ID", width: 50, hideable: true },
  { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
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
    minWidth: 130,
    hideable: true,
  },
  {
    field: "user_type",
    headerName: "Role",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          bgcolor: params.value.includes("Admin")
            ? "primary.light"
            : "grey.200",
          px: 1,
          py: 0.5,
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
    renderCell: () => (
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
    phone: "09774455040",
    user_type: "Admin",
  },
  {
    id: 2,
    name: "Cersei",
    email: "lannister@gmail.com",
    phone: "09774455040",
    user_type: "Admin",
  },
  {
    id: 3,
    name: "Jaime",
    email: "jaime@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
  {
    id: 4,
    name: "Arya",
    email: "arya@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
  {
    id: 5,
    name: "Daenerys",
    email: "daenerys@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
  {
    id: 6,
    name: "Melisandre",
    email: "melisandre@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
  {
    id: 7,
    name: "Ferrara",
    email: "ferrara@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
  {
    id: 8,
    name: "Rossini",
    email: "rossini@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
  {
    id: 9,
    name: "Harvey",
    email: "harvey@gmail.com",
    phone: "09774455040",
    user_type: "User",
  },
];

export default function ManageUserPageTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Typography sx={{ mt: 2, mb: 4 }}>Search Bar here</Typography>
      <Paper
        sx={{
          height: "70vh",
          width: "100%",
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
    </Box>
  );
}
