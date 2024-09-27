import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { MdCircleNotifications } from "react-icons/md";

const CustomAppBar = ({ pageTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme(); // Mengakses tema dengan useTheme
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle navigation
  const handleBackHome = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: 1000,
        bgcolor: "background.paper",
        color: theme.palette.primary.main,
        boxShadow: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section: Back, Divider, Home, Page Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Tombol Home */}
          <IconButton
            color="inherit"
            onClick={handleGoHome}
            edge="start"
            sx={{ mx: 1 }}
          >
            <HomeIcon />
          </IconButton>

          {/* Divider Vertikal */}
          <Divider orientation="vertical" flexItem />

          {/* Tombol Back */}
          <IconButton
            color="inherit"
            onClick={handleBackHome}
            edge="start"
            sx={{ mx: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Judul Halaman */}
          <Typography variant="h5" sx={{ marginLeft: 2 }}>
            {pageTitle}
          </Typography>
        </Box>

        {/* Right Section: Avatar and Menu */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" sx={{ mx: 1 }}>
            <MdCircleNotifications size={24} />
          </IconButton>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />{" "}
            {/* Ganti dengan avatar atau placeholder */}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={() => console.log("Logging out")}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
