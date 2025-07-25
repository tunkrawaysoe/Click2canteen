"use client";

import { useState, useTransition } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { useRouter } from "next/navigation";
import { hasPermission } from "@/lib/rbac";
import { deleteRestaurant } from "@/actions/restaurant";
import { EditSquare } from "@mui/icons-material";

export default function RestaurantActions({ user, restaurantId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDeleteClick = () => {
    handleMenuClose();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await deleteRestaurant(restaurantId);
      setConfirmOpen(false);
      router.refresh();
    });
  };

  if (!hasPermission(user, "delete", "restaurant", restaurantId)) return null;

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            router.push(`/admin/canteens/${restaurantId}/edit`);
          }}
        >
          <ListItemIcon>
            <EditSquare sx={{ color: "#fbc02d" }} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: "#d32f2f" }} /> {/* Red delete */}
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Restaurant?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this restaurant?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
