// path: /src/components/MainMenu.js
import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import menuItems from "./MenuItems"; // Import daftar menu
import MenuItem from "./MenuItem"; // Import komponen MenuItem
import logoWebp from "../assets/logo/logo-ajeg-hijau-64.webp";

const MainMenu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%", maxWidth: 800, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",

            p: 2,
            mb: 2,
          }}
        >
          <img
            src={logoWebp}
            alt="Logo"
            width="64"
            height="64"
            style={{ borderRadius: 4 }}
          />
          <Typography variant="h4" sx={{ mt: 2 }}>
            Warehouse Management System
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom>
          Halo, Admin, Selamat Datang!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Silakan pilih menu yang tersedia
        </Typography>
        <Grid container justifyContent="center">
          {menuItems.map((item, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <MenuItem
                icon={item.icon}
                label={item.label}
                onClick={() => (window.location.href = item.route)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainMenu;
