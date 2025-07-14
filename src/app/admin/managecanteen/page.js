// "use client";
// import { useMediaQuery, useTheme } from "@mui/material";
// import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import { Paper, Box, IconButton, Stack, Button } from "@mui/material";
// import { Edit, Remove } from "@mui/icons-material";

// import Link from "next/link";

// const columns = [
//   {
//     field: "id",
//     headerName: "ID",
//     width: 50,
//     hideable: true,
//   },
//   {
//     field: "adminid",
//     headerName: "Admin ID",
//     width: 50,
//     hideable: true,
//   },
//   {
//     field: "name",
//     headerName: "Name",
//     flex: 1,
//     minWidth: 100,
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     flex: 1,
//     renderCell: (params) => (
//       <Box
//         sx={{
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           maxWidth: "100%",
//         }}
//       >
//         {params.value}
//       </Box>
//     ),
//   },
//   {
//     field: "location",
//     headerName: "Location",
//     width: 150,
//     hideable: true,
//   },
//   {
//     field: "openinghour",
//     headerName: "Opening Hours",
//     width: 150,
//     hideable: true,
//   },
//   {
//     field: "contactphonenumber",
//     headerName: "Contact",
//     width: 120,
//     hideable: true,
//   },
//   {
//     field: "isactive",
//     headerName: "Is Active",
//     flex: 1,
//     width: 80,
//     renderCell: (params) => (
//       <Box
//         sx={{
//           bgcolor: params.value.includes("Open") ? "primary.light" : "#ff7961",
//           px: 1,
//           py: 0.5,
//           borderRadius: 1,
//           fontSize: "0.75rem",
//         }}
//       >
//         {params.value}
//       </Box>
//     ),
//   },
//   {
//     field: "actions",
//     headerName: "Action",
//     width: 100,
//     sortable: false,
//     filterable: false,
//     renderCell: (params) => (
//       <Box>
//         <Link href="/admin/managerestaurant/123" passHref>
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
//     description: "Wow it's 😋🍜🍣🍕🍔🍩🍰",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:00 AM - 7:00PM",
//     contactphonenumber: 9774455040,
//     isactive: "Open",
//   },
//   {
//     id: 2,
//     adminid: 22,
//     name: "JoJo",
//     description: "Wow it's 😋🍜🍣🍕🍔🍩🍰",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:00 AM - 7:00PM",
//     contactphonenumber: 9774455040,
//     isactive: "Open",
//   },
//   {
//     id: 3,
//     adminid: 33,
//     name: "Lotteria",
//     description: "Wow it's 😋🍜🍣🍕🍔🍩🍰",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:00 AM - 7:00PM",
//     contactphonenumber: 9774455040,
//     isactive: "Close",
//   },
//   {
//     id: 4,
//     adminid: 44,
//     name: "EatME",
//     description: "Wow it's 😋🍜🍣🍕🍔🍩🍰",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:00 AM - 7:00PM",
//     contactphonenumber: 9774455040,
//     isactive: "Open",
//   },
//   {
//     id: 5,
//     adminid: 55,
//     name: "Seasons",
//     description: "Wow it's 😋🍜🍣🍕🍔🍩🍰",
//     location: "MICT Park, Near Building 4",
//     openinghour: "8:00 AM - 7:00PM",
//     contactphonenumber: 9774455040,
//     isactive: "Open",
//   },
// ];

// export default function ManageCanteenPageTable() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <Box>
//       <Stack alignItems="flex-end" marginBottom="15px">
//         <Link passHref href="/admin/managecanteen/create">
//           <Button variant="contained">Add Canteen</Button>
//         </Link>
//       </Stack>
//       <Paper
//         sx={{
//           height: "70vh",
//           width: "100%",
//           overflow: "hidden",
//           p: isSmallScreen ? 0.5 : 2,
//           [`.${gridClasses.main}`]: {
//             borderRadius: 1,
//           },
//         }}
//       >
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           columnVisibilityModel={{
//             id: !isSmallScreen,
//             adminid: !isSmallScreen,
//             description: !isSmallScreen,
//             location: !isSmallScreen,
//             openinghour: !isSmallScreen,
//             isactive: !isSmallScreen,
//           }}
//           initialState={{
//             pagination: { paginationModel: { pageSize: 10 } },
//           }}
//           pageSizeOptions={[5, 10, 25]}
//           density={isSmallScreen ? "compact" : "standard"}
//           sx={{
//             border: 0,
//             "& .MuiDataGrid-cell": {
//               borderBottom: `1px solid ${theme.palette.divider}`,
//               py: 1,
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               bgcolor: theme.palette.grey[100],
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               minHeight: "200px !important",
//             },
//           }}
//           disableRowSelectionOnClick
//         />
//       </Paper>
//     </Box>
//   );
// }

// From Tun Kraway Soe

import { getAllRestaurants } from "@/lib/data/restaurant/restaurant";
import Image from "next/image";
import Link from "next/link";
import { Stack, Button } from "@mui/material";

export default async function RestaurantsPage() {
  const restaurants = await getAllRestaurants();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="15px"
      >
        <h1 className="text-3xl font-bold">Canteens</h1>
        <Link passHref href="/admin/managecanteen/add-canteen">
          <Button variant="contained">Add Canteen</Button>
        </Link>
      </Stack>

      {restaurants.length === 0 && <p>No restaurants found.</p>}
      <div className="space-y-6">
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            className={`flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-md p-4 ${
              !rest.isOpen ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden">
              <Image
                src={
                  rest.imageUrl ||
                  "https://images.unsplash.com/photo-1555992336-03a23c1f5c54?auto=format&fit=crop&w=800&q=80"
                }
                alt={rest.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col  justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{rest.name}</h2>
                <p className="text-sm text-gray-600">
                  <span className="text-black font-bold">Phone Number : </span>{" "}
                  {rest.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="text-black font-bold">Address : </span>{" "}
                  {rest.address}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {rest.isOpen ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      Open
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                      Closed
                    </span>
                  )}
                  {!rest.isActive && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  )}

                  {/* ✅ View Menu Link */}
                </div>
              </div>

              <div className="flex gap-3">
                {rest.isOpen && (
                  <Link
                    href={`/admin/managecanteen/${rest.id}/menu`}
                    className="inline-block bg-[#253863] text-white text-sm px-4 py-2 rounded-full shadow hover:opacity-90 transition"
                  >
                    View Menu
                  </Link>
                )}
                <Link
                  href={`/admin/managecanteen/${rest.id}/add-menu`}
                  className="inline-block bg-[#409e58] text-white text-sm px-4 py-2 rounded-full shadow hover:opacity-90 transition"
                >
                  + Add Menu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
