"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import { Typography } from "@mui/material";

export default function ManageAdmin() {
  return (
    <div>
      <Input
        placeholder="Search…"
        variant="soft"
        sx={{ width: "300px", mb: 1 }}
      />
      <Box>
        <Typography>Hi Let's start from here table</Typography>
      </Box>
    </div>
  );
}
