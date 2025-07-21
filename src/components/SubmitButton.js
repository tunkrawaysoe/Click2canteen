"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@mui/material";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      type="submit"
      sx={{
        mt: 3,
        backgroundColor: "#0D47A1",
        "&:hover": { backgroundColor: "#0B3C91" },
        textTransform: "none",
      }}
      fullWidth
      disabled={pending}
    >
      {pending ? "Updating..." : "Update User"}
    </Button>
  );
}
