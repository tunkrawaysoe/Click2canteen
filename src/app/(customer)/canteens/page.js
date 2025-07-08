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
  );
}

export default SelectCanteenCard;
