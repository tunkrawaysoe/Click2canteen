"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";

export default function BackButton({buttonName = "Back"}) {
  const router = useRouter();

  return (
    <div className="mb-6">
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowLeft />}
        onClick={() => router.back()}
        sx={{
            background: "linear-gradient(180deg, #00022E 0%, #001D51 100%)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius :'15px',
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(180deg, #001D51 0%, #00022E 100%)",
            },
          }}
      >
        {buttonName}
      </Button>
    </div>
  );
}
