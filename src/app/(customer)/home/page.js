"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Link from "next/link";

const foodCategories = [
  { name: "Burgers", image: "/images/burger.jpeg" },
  { name: "Noodles", image: "/images/burger.jpeg" },
  { name: "Drinks", image: "/images/burger.jpeg" },
  { name: "Snacks", image: "/images/burger.jpeg" },
];

const popularRestaurants = [
  { name: "Golden Spoon", image: "/images/canteen.jpeg" },
  { name: "Taste Corner", image: "/images/canteen.jpeg" },
  { name: "Canteen 1", image: "/images/canteen.jpeg" },
];

const HeroSection = () => {
  return (
    <>
      {/* Hero Banner */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#bfbfbfff",
          width: "100%", // full width of parent
          height: "400px", // fixed height
          backgroundImage: `url('/images/background.jpeg')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight="bold"
              color=""
              fontStyle="italic"
            >
              Welcome from Click2Canteen
            </Typography>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                maxWidth: 500,
                mx: "auto",
              }}
            >
              <Typography variant="h4" fontWeight="medium" color="#FFFF99">
                Delicious Food, Delivered Fast
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: "#D3D3D3" }}>
                Order your favorite meals from the canteen, hot and fresh. Easy,
                fast, and tasty.
              </Typography>
              <Link href="/canteens" passHref>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
                >
                  Select Restaurant
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/Hamburger.png"
              alt="Delicious Food"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: 300, md: 500 },
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* Popular Restaurants Section */}
      <Box sx={{ px: 4, py: 8, backgroundColor: "#bfbfbfff" }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Popular Restaurants
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {popularRestaurants.map((restaurant, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  minWidth: 350,
                  maxWidth: 350,
                  height: 350,
                  flexShrink: 0,
                  color: "orange",
                  backgroundColor: "rgba(242, 245, 222, 1)",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease",
                  transformOrigin: "center",
                  position: "relative",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                    zIndex: 10,
                    backgroundColor: " #a4ff89ff",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={restaurant.image}
                  alt={restaurant.name}
                  sx={{ height: 220, objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {restaurant.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Food Categories Section */}
      <Box sx={{ px: 4, py: 8, backgroundColor: "#bfbfbfff" }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Food Categories
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {foodCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: 300,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{ height: 180, objectFit: "cover" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HeroSection;
