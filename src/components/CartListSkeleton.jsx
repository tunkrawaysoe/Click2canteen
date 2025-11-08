"use client";

import { Stack, Skeleton, Box } from "@mui/material";

export default function CartListSkeleton({ count = 2 }) {
  return (
    <Stack spacing={3}>
      {Array.from({ length: count }).map((_, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            height: { xs: "auto", sm: 220 },
          }}
        >
          {/* Image skeleton */}
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", sm: "33.33%" },
              height: { xs: 200, sm: "100%" },
              flexShrink: 0,
            }}
          />

          {/* Content skeleton */}
          <Stack
            spacing={1}
            sx={{
              width: { xs: "100%", sm: "66.66%" },
              p: 2,
            }}
          >
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="rectangular" width={80} height={30} />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
