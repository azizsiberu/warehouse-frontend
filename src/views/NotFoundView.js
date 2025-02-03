// path: src/views/NotFoundView.js
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = ({ setPageTitle }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const title = "404 | Halaman Tidak Ditemukan";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h2" color="primary">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Halaman Tidak Ditemukan
      </Typography>
      <Typography variant="body1">
        Oops! Halaman yang Anda cari tidak tersedia atau belum dibuat.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Kembali ke Beranda
      </Button>
    </Box>
  );
};

export default NotFound;
