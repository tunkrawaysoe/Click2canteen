"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Paper, Box, IconButton, Tooltip } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import Link from "next/link";

const columns = [
  {
    field: "orderid",
    headerName: "Order ID",
    width: 70,
    hideable: true,
  },
  {
    field: "userid",
    headerName: "User ID",
    width: 90,
    hideable: true,
  },
  {
    field: "restaurantid",
    headerName: "Restaurant ID",
    flex: 1,
    minWidth: 120,
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
    width: 250,
    hideable: true,
  },
  {
    field: "actions",
    headerName: "Action",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <Link href="/admin/orderhistory/123" passHref>
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
    id: 1,
    userid: 11,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 2,
    userid: 22,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Delivered",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 3,
    userid: 33,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 4,
    userid: 44,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
  {
    id: 5,
    userid: 55,
    restaurantid: 111,
    orderdate: "2-25-09-22",
    status: "Pending",
    totalamount: "5000",
    deliveryaddress: "MICT Park, Near Building 4",
  },
];

export default function OrderHistoryPageTable() {
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
          adminid: !isSmallScreen,
          description: !isSmallScreen,
          location: !isSmallScreen,
          openinghour: !isSmallScreen,
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
