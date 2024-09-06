// path: /src/components/Loading.js
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  const theme = useTheme(); // Mengakses warna dari theme

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Menampilkan elemen secara vertikal
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Mengatur loading agar berada di tengah halaman
      }}
    >
      {/* BeatLoader untuk animasi loading */}
      <BeatLoader color={theme.palette.primary.main} />

      {/* Teks di bawah loader */}
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
          fontFamily: "Open Sans",
          color: theme.palette.text.primary,
        }}
      >
        Sedang mengambil data
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontFamily: "Open Sans", color: theme.palette.text.secondary }}
      >
        Mohon tunggu...
      </Typography>
    </Box>
  );
};

export default Loading;
