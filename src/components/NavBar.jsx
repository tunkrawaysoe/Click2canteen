import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#00022E",
          color: "white",
          top: 0,
          zIndex: 1100,
        }} // bol, white text
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Click2Canteen
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link href="/home" passHref>
              <Button>Home</Button>
            </Link>

            <Link href="/canteens" passHref>
              <Button>Canteen</Button>
            </Link>

            <Link href="/aboutus" passHref>
              <Button>AboutUs</Button>
            </Link>
            <Link href="/cart" passHref>
              <Button>Cart</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
