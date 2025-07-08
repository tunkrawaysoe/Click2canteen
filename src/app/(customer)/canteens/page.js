<<<<<<< HEAD
import { PrismaClient } from "@/generated/prisma";
import Image from "next/image";

let prisma;
if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

      {restaurants.length === 0 && <p>No restaurants found.</p>}

      <div className="space-y-6">
        {restaurants.map((rest) => (
          <div
            key={rest.id}
            className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow-md p-4"
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

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold">{rest.name}</h2>
                <p className="text-sm text-gray-600">{rest.phone}</p>
                <p className="text-sm text-gray-600">{rest.address}</p>
              </div>

              <div className="flex gap-2 mt-4">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
=======
"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Link from 'next/link';

const canteens = [
  {
    id: 1,
    name: 'Main Campus Canteen',
    description: 'Affordable meals with local flavors.',
    image: '/images/canteen.jpeg', // Put your image path here
  },
  {
    id: 2,
    name: 'North Wing Canteen',
    description: 'Fresh snacks and beverages.',
    image: '/images/canteen1.jpeg',
  },
  {
    id: 3,
    name: 'Vegetarian Canteen',
    description: 'Healthy vegetarian options available.',
    image: '/images/canteen2.jpeg',
  },
  {
    id: 4,
    name: 'Foodies Canteen',
    description:'Fresh snacks and beverages',
    image:'/images/canteen3.jpeg',
  }
];

function SelectCanteenCard() {
  const [selectedCard, setSelectedCard] = React.useState(null);

  return (

    <>
    <Box
     sx={{
      padding: "70px",
        fontSize: "15px",
        color:"red",
        alignItems:"end"
    }}>
      <Typography sx={{marginRight:"30px"}}>Choose Your Canteen to</Typography> 
      <Typography>Explore the Menu!</Typography>
    </Box>
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 2,
      }}
    >
      {canteens.map((canteen, index) => (
        <Link href={`/canteens/${canteen.id}/menu`}><
          Card key={canteen.id} sx={{ height: '100%' }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            {canteen.image && (
              <CardMedia
                component="img"
                height="140"
                image={canteen.image}
                alt={canteen.name}
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {canteen.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {canteen.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card></Link>
      ))}
    </Box>
    </>
>>>>>>> 78f5fbffcd84e839e09a5f593342d02370ed739d
  );
}

export default SelectCanteenCard;
