"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

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
    <Typography
     sx={{
      width:'100%',
      display:'grid',
      

    }}>
      <div>Choose Your Canteen to</div> 
      <p>Explore the Menu!</p>
      <div>Choose a canteen to start</div>
    </Typography>
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 2,
      }}
    >
      {canteens.map((canteen, index) => (
        <Card key={canteen.id} sx={{ height: '100%' }}>
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
        </Card>
      ))}
    </Box>
    </>
  );
}

export default SelectCanteenCard;
