"use client";
import * as React from "react";
import { useState } from "react";

import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

// MUI Icons
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const drawerWidth = 240;

import Link from "next/link";

const navLinks = [
  { label: "Manage Admin", href: "/admin/manageadmin" },
  { label: "Manage User", href: "/admin/manageuser" },
  { label: "Food Order", href: "/admin/foodorder" },
  { label: "Order History", href: "/admin/orderhistory" },
  { label: "Upload Menu", href: "/admin/uploadmenu" },
];

const getIconByText = (text) => {
  switch (text) {
    case "Manage Admin":
      return (
        <img
          src="/icons/admin.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    case "Manage User":
      return (
        <img
          src="/icons/user.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    case "Food Order":
      return (
        <img
          src="/icons/food_order_icon.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    case "Order History":
      return (
        <img
          src="/icons/history.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    case "Upload Menu":
      return (
        <img
          src="/icons/upload_menu.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    default:
      return <MailIcon />;
  }
};

const settings = ["Profile", "Account", "Logout"];

export default function AdminNavSideBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "grey.200",
          }}
        >
          <Toolbar disableGutters>
            <Box sx={{ width: { xs: 100, sm: 150, md: 200 }, mr: 2 }}>
              <img
                src="/icons/click2canteenLogo.svg"
                alt="Logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>

            {/* Spacer grows to take all available space */}
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 0, pr: 3 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="System Admiin"
                    src="/userProfilePhoto/admin.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {navLinks.map((text) => (
                <ListItem key={text.label} disablePadding>
                  <Link key={text.label} href={text.href} passHref>
                    <ListItemButton>
                      <ListItemIcon>{getIconByText(text.label)}</ListItemIcon>
                      <ListItemText primary={text.label} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <Toolbar /> */}
          <Box sx={{ mt: "30px" }}></Box>
        </Box>
      </Box>
    </>
  );
}
