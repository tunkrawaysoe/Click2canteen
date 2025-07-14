// // import { PrismaClient } from "@/generated/prisma";
// // import Image from "next/image";

// // let prisma;
// // if (!global.prisma) {
// //   global.prisma = new PrismaClient();
// // }
// // prisma = global.prisma;

// // export default async function RestaurantsPage() {
// //   const restaurants = await prisma.restaurant.findMany({
// //     orderBy: { createdAt: "desc" },
// //   });

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

// //       {restaurants.length === 0 && <p>No restaurants found.</p>}

// //       <div className="space-y-6">
// //         {restaurants.map((rest) => (
// //           <div
// //             key={rest.id}
// //             className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-md p-4"
// //           >
// //             <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden">
// //               <Image
// //                 src={
// //                   rest.imageUrl ||
// //                   "https://images.unsplash.com/photo-1555992336-03a23c1f5c54?auto=format&fit=crop&w=800&q=80"
// //                 }
// //                 alt={rest.name}
// //                 fill
// //                 className="object-cover"
// //               />
// //             </div>

// //             <div className="flex flex-col justify-between flex-1">
// //               <div>
// //                 <h2 className="text-xl font-semibold">{rest.name}</h2>
// //                 <p className="text-sm text-gray-600">{rest.phone}</p>
// //                 <p className="text-sm text-gray-600">{rest.address}</p>
// //               </div>

// //               <div className="flex gap-2 mt-4">
// //                 {rest.isOpen ? (
// //                   <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
// //                     Open
// //                   </span>
// //                 ) : (
// //                   <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
// //                     Closed
// //                   </span>
// //                 )}
// //                 {!rest.isActive && (
// //                   <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
// //                     Inactive
// //                   </span>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// // =======
// "use client";
// import * as React from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   CardActionArea,
//   CardMedia,
//   IconButton,
//   Chip,
//   colors,
// } from "@mui/material";
// import Link from "next/link";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// const canteens = [
//   {
//     id: 1,
//     name: "Main Campus Canteen",
//     description: "Affordable meals with local flavors.",
//     image: "/images/canteen.jpeg",
//     isOpen: true,
//     isActive: true,
//   },
//   {
//     id: 2,
//     name: "North Wing Canteen",
//     description: "Fresh snacks and beverages.",
//     image: "/images/canteen1.jpeg",
//     isOpen: false,
//     isActive: false,
//   },
//   {
//     id: 3,
//     name: "Vegetarian Canteen",
//     description: "Healthy vegetarian options available.",
//     image: "/images/canteen2.jpeg",
//     isOpen: true,
//     isActive: true,
//   },
//   {
//     id: 4,
//     name: "Foodies Canteen",
//     description: "Fresh snacks and beverages",
//     image: "/images/canteen3.jpeg",
//     isOpen: true,
//     isActive: true,
//   },
//   {
//     id: 5,
//     name: "Rocker Canteen",
//     description: "Fresh snacks and beverages",
//     image: "/images/canteen2.jpeg",
//     isOpen: false,
//     isActive: false,
//   },
//   {
//     id: "6",
//     name: "Golden Spoon",
//     description: "No. 42, Inya Road | 09-765432109",
//     image: "/images/canteen3.jpeg",
//     isOpen: true,
//     isActive: true,
//   },
// ];

// function SelectCanteenCard() {
//   const [selectedCard, setSelectedCard] = React.useState(null);
//   const scrollRef = React.useRef(null);

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     if (container) {
//       container.scrollBy({
//         left: direction === "left" ? -100 : 200,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <>
//     <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#0f172a' ,
//             width: '100%',           // full width of parent
//             height: '400px',         // fixed height
//             backgroundImage: `url('/images/background.jpeg')`,
//             backgroundSize: '100% 90%',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             position: 'relative',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#fff',
//             textAlign: 'center',
//         }}>
//       {/* Heading */}
//       {/* <Box
//         sx={{
//           padding: "70px",
//           color: "green",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "right", // or 'flex-start' / 'flex-end' based on desired alignment
//           textAlign: "right",
//           fontFamily: "nunito",
//           fontSize: "200%",
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Choose Your Canteen
//         </Typography>
//         <Typography variant="subtitle1">Explore the Menu!</Typography>
//         <Typography variant="subtitle3">WOW,What is that!</Typography>
//       </Box> */}

//       {/* Left Arrow */}
//       <IconButton
//         onClick={() => scroll("left")}
//         sx={{
//           position: "absolute",
//           left: 10,
//           top: "50%",
//           transform: "translateY(-50%)",
//           zIndex: 2,
//           backgroundColor: "#f5f5f5",
//           boxShadow: 5,
//           "&:hover": { backgroundColor: "skyblue" },
//         }}
//       >
//         <ArrowBackIosNewIcon />
//       </IconButton>

//       {/* Right Arrow */}
//       <IconButton
//         onClick={() => scroll("right")}
//         sx={{
//           position: "absolute",
//           right: 10,
//           top: "50%",
//           transform: "translateY(-50%)",
//           zIndex: 2,
//           backgroundColor: "#f5f5f5",
//           boxShadow: 5,
//           "&:hover": { backgroundColor: "skyblue" },
//         }}
//       >
//         <ArrowForwardIosIcon />
//       </IconButton>

//       {/* Scrollable Card List */}
//       <Box
//         ref={scrollRef}
//         sx={{
//           marginBottom: 1,
//           padding: 5,
//           display: "flex",
//           overflowX: "auto",
//           gap: 10,
//           position: "relative",
//           scrollBehavior: "smooth",
//           scrollbarWidth: "thick",
//           "&::-webkit-scrollbar": {
//             height: 8,
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "green",
//             borderRadius: 4,
//           },
//           "&::-webkit-scrollbar-track": {
//             backgroundColor: "#0000",
//           },
//         }}
//       >
//         {canteens.map((canteen, index) => (
//           <Link key={canteen.id} href={`/canteens/${canteen.id}/menu`} passHref>
//             <Card
//               sx={{
//                 minWidth: 350,
//                 maxWidth: 350,
//                 height: 450,
//                 flexShrink: 0,
//                 color: "orange",
//                 backgroundColor: "rgb(226, 197, 159)",
//                 transition: "transform 0.5s ease, box-shadow 0.5s ease",
//                 transformOrigin: "center",
//                 position: "relative",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: 10,
//                   zIndex: 10,
//                   backgroundColor: " #C19A6B",
//                 },
//               }}
//             >
//               {/* Show "Open" badge if isOpen === true */ false}
//               {canteen.isOpen ? (
//                 <Chip
//                   label="Open"
//                   color="success"
//                   size="small"
//                   sx={{ position: "absolute", top: 8, right: 8, zIndex: 5 }}
//                 />
//               ) : (
//                 <Chip
//                   label="Closed"
//                   color="error"
//                   size="small"
//                   sx={{ position: "absolute", top: 8, right: 8, zIndex: 5 }}
//                 />
//               )}

//               <CardActionArea
//                 onClick={() => setSelectedCard(index)}
//                 data-active={selectedCard === index ? "" : undefined}
//                 sx={{
//                   height: "100%",
//                   "&[data-active]": {
//                     backgroundColor: "action.selected",
//                     "&:hover": {
//                       backgroundColor: "action.selectedHover",
//                     },
//                   },
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={canteen.image || "/default-image.jpg"}
//                   alt={canteen.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {canteen.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {canteen.description || "No description available."}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Link>
//         ))}
//       </Box>
//       </Box>
//     </>
//   );
// }

// export default SelectCanteenCard;


import { getAllRestaurants } from "@/lib/data/restaurant/restaurant";
import Image from "next/image";
import Link from "next/link";

export default async function RestaurantsPage() {
  const restaurants = await getAllRestaurants();

  return (
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
=======
    <>
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#0f172a' ,
            width: '100%',           // full width of parent
            height: '400px',         // fixed height
            backgroundImage: `url('/images/BGCanteen.jpeg')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
        }}>
      {/* Heading */}
      {/* <Box
        sx={{
          padding: "70px",
          color: "green",
          display: "flex",
          flexDirection: "column",
          alignItems: "right", // or 'flex-start' / 'flex-end' based on desired alignment
          textAlign: "right",
          fontFamily: "nunito",
          fontSize: "200%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Choose Your Canteen
        </Typography>
        <Typography variant="subtitle1">Explore the Menu!</Typography>
        <Typography variant="subtitle3">WOW,What is that!</Typography>
      </Box> */}
>>>>>>> 784b97d9c26e43c08adce46f301daa7436d29452

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
                    href={`canteens/${rest.id}/menu`}
                    className="inline-block bg-[#253863] text-white text-sm px-4 py-2 rounded-full shadow hover:opacity-90 transition"
                  >
                    View Menu
                  </Link>
                )}
                <Link
                  href={`/tests/restaurants/${rest.id}/add-menu`}
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
