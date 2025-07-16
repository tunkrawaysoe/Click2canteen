"use client";
import { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Link from "next/link";
import axios from "axios";

export default function UploadMenu() {
  const [menus, setMenus] = useState([]);
  const getMenuList = async () => {
    try {
      console.log("getMenuList()");
      const response = await axios.get("/api/menus");
      console.log("API Response", response.data);
      setMenus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Menus setMenus data check", menus);

  useEffect(() => {
    getMenuList();
    console.log("Render useEffect");
  }, []);

  return (
    <Box padding={2}>
      <Stack alignItems="flex-end" marginBottom="15px">
        <Link passHref href="/admin/uploadmenu/create">
          <Button variant="contained">Add Menu</Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Restaurant ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Available</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menus.map((menu, index) => (
              <TableRow key={menu.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{menu.id}</TableCell>
                <TableCell>{menu.restaurantid}</TableCell>
                <TableCell>{student.category}</TableCell>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{student.image}</TableCell>
                <TableCell>{student.price}</TableCell>
                <TableCell>{student.description}</TableCell>
                <TableCell>{student.available}</TableCell>
                <TableCell align="center">
                  {/* <Link href={`/menu/${menu.id}`} passHref> */}
                  <Link href="/uploadmenu/123" passHref>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                  <Link href={`/menu/${student.id}/edit`} passHref>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
