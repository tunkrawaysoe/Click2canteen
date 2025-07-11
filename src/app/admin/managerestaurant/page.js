// "use client";
// import { Typography } from "@mui/material";

// export default function ManageRestaurantPage() {
//   return (
//     <>
//       <Typography>This is the Manage Restaurant page content.</Typography>
//     </>
//   );
// }
// "use client";
// import { useMediaQuery, useTheme } from "@mui/material";
// import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import { Paper, Box, IconButton } from "@mui/material";
// import { Edit, Remove } from "@mui/icons-material";

// import Link from "next/link";
// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     width: 70,
//     hideable: true, // Allows hiding on small screens
//   },
//   {
//     field: "adminid",
//     headerName: "Admin ID",
//     width: 70,
//     hideable: true, // Allows hiding on small screens
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     flex: 1, // Responsive width
//     minWidth: 120,
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     flex: 1,
//     minWidth: 150,
//     hideable: true,
//   },
//   {
//     field: "location",
//     headerName: "Location",
//     flex: 1,
//     width: 130,
//     hideable: true,
//   },
//   {
//     field: "openinghour",
//     headerName: "Openinghour",
//     flex: 1,
//     width: 130,
//     hideable: true,
//   },
//   {
//     field: "contactphonenumber",
//     headerName: "Contact Phone Number",
//     flex: 1,
//     width: 130,
//     hideable: true,
//   },

//   {
//     field: "actions",
//     headerName: "Action",
//     width: 100,
//     sortable: false,
//     filterable: false,
//     renderCell: (params) => (
//       <Box>
//         <Link href="/admin/manageuser/123">
//           <IconButton size="small" color="primary">
//             <Edit fontSize="small" />
//           </IconButton>
//         </Link>
//         <IconButton size="small" color="error">
//           <Remove fontSize="small" />
//         </IconButton>
//       </Box>
//     ),
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     adminid: 11,
//     name: "Fu Food",
//     description:
//       "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:AM - 7:PM",
//     contactphonenumber: 9774455040,
//   },
//   {
//     id: 2,
//     adminid: 22,
//     name: "JoJo",
//     description:
//       "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:AM - 7:PM",
//     contactphonenumber: 9774455040,
//   },
//   {
//     id: 3,
//     adminid: 33,
//     name: "Lotteria",
//     description:
//       "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:AM - 7:PM",
//     contactphonenumber: 9774455040,
//   },
//   {
//     id: 4,
//     adminid: 44,
//     name: "EatME",
//     description:
//       "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:AM - 7:PM",
//     contactphonenumber: 9774455040,
//   },
//   {
//     id: 5,
//     adminid: 55,
//     name: "Seasons",
//     description:
//       "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:AM - 7:PM",

//     contactphonenumber: 9774455040,
//   },
// ];

// export default function ManageRestaurantPageTable() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Paper
//       sx={{
//         height: "70vh",
//         // width: "100%",
//         width: "80vw",
//         overflow: "hidden",
//         p: isSmallScreen ? 0.5 : 2,
//         [`.${gridClasses.main}`]: {
//           borderRadius: 1,
//         },
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         columnVisibilityModel={{
//           id: !isSmallScreen,
//           email: !isSmallScreen,
//           phone: !isSmallScreen,
//         }}
//         initialState={{
//           pagination: { paginationModel: { pageSize: 10 } },
//         }}
//         pageSizeOptions={[5, 10, 25]}
//         density={isSmallScreen ? "compact" : "standard"}
//         sx={{
//           border: 0,
//           "& .MuiDataGrid-cell": {
//             borderBottom: `1px solid ${theme.palette.divider}`,
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             bgcolor: theme.palette.grey[100],
//           },
//         }}
//         disableRowSelectionOnClick
//       />
//     </Paper>
//   );
// }

"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Paper, Box, IconButton } from "@mui/material";
import { Edit, Remove } from "@mui/icons-material";
import Link from "next/link";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    hideable: true,
  },
  {
    field: "adminid",
    headerName: "Admin ID",
    width: 90,
    hideable: true,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 150,
    hideable: true,
    renderCell: (params) => (
      <Box
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    hideable: true,
  },
  {
    field: "openinghour",
    headerName: "Opening Hours",
    width: 130,
    hideable: true,
  },
  {
    field: "contactphonenumber",
    headerName: "Contact",
    width: 120,
    hideable: true,
  },
  {
    field: "isactive",
    headerName: "Is Active",
    flex: 1,
    width: 150,
    renderCell: (params) => (
      <Box
        sx={{
          bgcolor: params.value.includes("Is Active")
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
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box>
        <Link href="/admin/managerestaurant/123" passHref>
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
    adminid: 11,
    name: "Fu Food",
    description:
      "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
    location: "MICT Park, Near Building 4",
    openinghour: "8:AM - 7:PM",
    contactphonenumber: 9774455040,
    isactive: "Open",
  },
  {
    id: 2,
    adminid: 22,
    name: "JoJo",
    description:
      "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
    location: "MICT Park, Near Building 4",
    openinghour: "8:AM - 7:PM",
    contactphonenumber: 9774455040,
    isactive: "Open",
  },
  {
    id: 3,
    adminid: 33,
    name: "Lotteria",
    description:
      "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
    location: "MICT Park, Near Building 4",
    openinghour: "8:AM - 7:PM",
    contactphonenumber: 9774455040,
    isactive: "Open",
  },
  {
    id: 4,
    adminid: 44,
    name: "EatME",
    description:
      "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
    location: "MICT Park, Near Building 4",
    openinghour: "8:AM - 7:PM",
    contactphonenumber: 9774455040,
    isactive: "Open",
  },
  {
    id: 5,
    adminid: 55,
    name: "Seasons",
    description:
      "Wow it's 😋🍜🍣🍕🍔🍩🍰🍓🍫🍤🍛🍟🍇🍱🌮🍦🥟🍗🍞🥮🥑🧁🍉🍪🥗🍙🍷🍵",
    location: "MICT Park, Near Building 4",
    openinghour: "8:AM - 7:PM",
    contactphonenumber: 9774455040,
    isactive: "Open",
  },
];

export default function ManageRestaurantPageTable() {
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
