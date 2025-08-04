"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const UsersDisplay = ({ users }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <Box>
      {/* Desktop Table View */}
      <TableContainer
        component={Paper}
        sx={{ display: { xs: "none", md: "block" }, boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Image
                    src={user.profileImage || "/default-avatar.svg"}
                    alt={user.name}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <Typography>{user.name}</Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {user.role || "User"}
                  </Typography>
                </TableCell>
                <TableCell>{user.restaurant?.name || "-"}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    passHref
                    legacyBehavior
                  >
                    <Button
                      component="a"
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#ccaa12",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#b89910",
                        },
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile View */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        {currentUsers.map((user) => {
          const isExpanded = expandedUserId === user.id;
          return (
            <Paper
              key={user.id}
              sx={{
                mb: 2,
                p: 1,
                cursor: "pointer",
                boxShadow: isExpanded ? 6 : 1,
                borderRadius: 2,
              }}
              onClick={() => toggleExpand(user.id)}
              elevation={isExpanded ? 6 : 1}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Image
                  src={user.profileImage || "/default-avatar.svg"}
                  alt={user.name}
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      mt: 0.5,
                    }}
                  >
                    {user.role || "User"}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(user.id);
                  }}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Box>

              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 2, pl: 7 }}>
                  <Typography>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> -
                  </Typography>
                  <Typography>
                    <strong>Restaurant:</strong> {user.restaurant?.name || "-"}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      passHref
                      legacyBehavior
                    >
                      <Button
                        component="a"
                        variant="contained"
                        size="small"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#ccaa12",
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#b89910",
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          );
        })}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography sx={{ fontWeight: 600 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UsersDisplay;
