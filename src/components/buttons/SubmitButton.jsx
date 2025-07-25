"use client";

import { useFormStatus } from "react-dom";
import { Button, CircularProgress, Box } from "@mui/material";

export default function SubmitButton({ label }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      sx={{
        mt: 1,
        px: 2,
        py: 1,
        background: "linear-gradient(to bottom, #00022E, #001D51)",
        color: "white",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
          background: "#253863",
        },
        "& .MuiCircularProgress-root": {
          color: "white",
        },
      }}
      fullWidth
      disabled={pending}
    >
      {pending ? (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          whiteSpace="nowrap"
          color="white"
          sx={{ userSelect: "none" }}
        >
          <CircularProgress size={20} thickness={5} />
          <span>Updating...</span>
        </Box>
      ) : (
        label
      )}
    </Button>
  );
}
