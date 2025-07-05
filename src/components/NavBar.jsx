"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Canteens", href: "/canteens" },
  { label: "Aboutus", href: "/aboutus" },
];

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.label} component={Link} href={item.href}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button component={Link} href="/login">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} href="/register">
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#0f172a" }}>
        <Toolbar className="max-w-7xl mx-auto w-full">
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>

          <Typography variant="h6" className="font-bold flex-grow">
            Click2Canteen
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <Button color="inherit">{item.label}</Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1, ml: 2 }}>
            <Link href="/login" passHref>
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button variant="contained" color="secondary">
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {drawerList}
      </Drawer>
    </>
  );
}
