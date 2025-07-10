"use client";
import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#0f172a' ,
        width: '100%',           // full width of parent
        height: '400px',         // fixed height
        backgroundImage: `url('/images/background.jpeg')`,
        backgroundSize: '100% 90%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textAlign: 'center',
    }}>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', px: 4 }}
      >
        {/* Left: Text */}
        <Grid item xs={12} md={6}>
          <Typography variant='h2' component="h1" gutterBottom fontWeight="bold">
              Welcome from Click2Canteen
            </Typography>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: 500, mx: 'auto'}}>
            <Typography variant="h4" component="h3"  fontWeight="50">
              Delicious Food, Delivered Fast
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Order your favorite meals from the canteen, hot and fresh. Easy, fast, and tasty.
            </Typography>
            <Link href="/canteens" passHref>
            <Button
              variant="contained"
              color="error"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              Select Restaurant
            </Button>
            </Link>
          </Box>
        </Grid>

        {/* Right: Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/images/food.png"
            alt="Delicious Food"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: { xs: 300, md: 500 },
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
