"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Paper, Box, IconButton, Tooltip } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import Link from "next/link";

const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidthidth: 50,
    hideable: true,
  },
  {
    field: "userid",
    headerName: "User ID",
    width: 80,
    hideable: true,
  },
  {
    field: "restaurantid",
    headerName: "Restaurant ID",
    width: 120,
    hideable: true,
  },
  {
    field: "orderdate",
    headerName: "Order Date",
    width: 150,
    hideable: true,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    width: 100,
    renderCell: (params) => (
      <Box
        sx={{
          bgcolor: params.value.includes("Pending")
            ? "primary.light"
            : "#009688",
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
    field: "totalamount",
    headerName: "Total Amount",
    flex: 1,
    minWidth: 70,
  },
  {
    field: "deliveryaddress",
    headerName: "Delivery Address",
    minWidthwidth: 250,
    hideable: true,
  },
  {
    field: "actions",
    headerName: "Action",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <Link href="/admin/foodorder/123" passHref>
          <Tooltip title="View Detail">
            <IconButton size="small" color="primary">
              <NoteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    ),
  },
];

const rows = [
  {
    id: 1, //Order ID
    userid: 11,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 2, //Order ID
    userid: 22,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Delivered",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 3, //Order ID
    userid: 33,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 4, //Order ID
    userid: 44,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 5, //Order ID
    userid: 55,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
];

export default function FoodOrderPageTable() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
          userid: !isSmallScreen,
          restaurantid: !isSmallScreen,
          orderdate: !isSmallScreen,
          status: !isSmallScreen,
          totalamount: !isSmallScreen,
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
            py: 1,
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: theme.palette.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            minHeight: "200px !important",
          },
        }}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
