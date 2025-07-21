"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="mb-6">
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowLeft />}
        onClick={() => router.back()}
        sx={{
          textTransform: "none",
          borderRadius: 20,
          px: 3,
          py: 1,
          backgroundColor: "#0D47A1",
          "&:hover": { backgroundColor: "#0B3C91" },
        }}
      >
        Back
      </Button>
    </div>
  );
}
