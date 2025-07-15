"use client";
import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";

import MenuIcon from "@mui/icons-material/Menu";

const navLinks = [
  { label: "Manage User", href: "/admin/manageuser" },
  { label: "Manage Canteen", href: "/admin/managecanteen" },
  { label: "Food Order", href: "/admin/foodorder" },
  { label: "Order History", href: "/admin/orderhistory" },
];

const getIconByText = (text) => {
  switch (text) {
    case "Manage User":
      return (
        <img
          src="/logo&icon/user.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );

    case "Manage Canteen":
      return (
        <img
          src="/logo&icon/canteen.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );

    case "Food Order":
      return (
        <img
          src="/logo&icon/order.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    case "Order History":
      return (
        <img
          src="/logo&icon/history.png"
          alt="Dashboard"
          style={{ width: 24, height: 24 }}
        />
      );
    default:
      return null;
  }
};

const drawerWidth = 240;

function ResponsiveDrawer({ children, window }) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Add this new function to close drawer when a link is clicked
  const handleLinkClick = () => {
    if (mobileOpen) {
      // setMobileOpen(false);
      setTimeout(() => setMobileOpen(false), 200); // 200ms delay
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: 50 }} />
      {/* <Divider /> */}
      <List>
        {navLinks.map((text, index) => (
          <ListItem key={index} disablePadding>
            <Link
              key={index}
              href={text.href}
              passHref
              onClick={handleLinkClick}
            >
              <ListItemButton selected={pathname === text.href}>
                <ListItemIcon>{getIconByText(text.label)}</ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#001D51",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left - Logo & Menu Icon (for mobile) */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
              aria-expanded={mobileOpen}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ width: { xs: 100, sm: 150, md: 200 }, mr: 2 }}>
              <img
                src="/logo&icon/click2canteenLogo(1).svg"
                alt="Logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Box>

          {/* Right - Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" src="/userProfilePhoto/admin_photo.svg" />
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
              {["Profile", "Logout"].map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  children: PropTypes.node,
  window: PropTypes.object, // Changed from PropTypes.func to PropTypes.object
};

export default ResponsiveDrawer;
