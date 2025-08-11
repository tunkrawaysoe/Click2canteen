"use client";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function OfflineNotice() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={!isOnline}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        You are offline. Please check your internet connection.
      </Alert>
    </Snackbar>
  );
}
