// path: /src/components/MenuItem.js
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const MenuItem = ({ icon: Icon, label, onClick }) => {
  const theme = useTheme(); // Mengakses tema dengan useTheme

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
        cursor: "pointer",
        "&:hover .menu-box": {
          backgroundColor: theme.palette.secondary.main,
          border: `2px solid white`,
        },
        "&:hover .icon": {
          color: "white", // Warna ikon saat hover
        },
      }}
      onClick={onClick}
    >
      <Box
        className="menu-box"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          padding: 2,
          borderRadius: "12px",
          boxShadow:
            "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
          color: "white",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Icon className="icon" size={50} />{" "}
        {/* Menggunakan ukuran ikon yang ditentukan */}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ marginTop: 1, textAlign: "center", fontWeight: 600 }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default MenuItem;
