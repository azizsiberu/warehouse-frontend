import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { clearAuth } from "../redux/reducers/authReducer";
import DefaultLogo from "../assets/logo/logo-ajeg-hijau-64.webp";

const CustomAppBar = ({ pageTitle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { nama_lengkap, foto_profil } = useSelector(
    (state) => state.auth.profile
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    console.log("🔄 Navigating back and refreshing...");
    navigate(-1); // ✅ Kembali ke halaman sebelumnya
    setTimeout(() => {
      window.location.reload(); // ✅ Refresh halaman setelah navigasi
    }, 100); // Beri sedikit jeda untuk memastikan navigasi selesai
  };

  const handleGoHome = () => {
    console.log("🔄 Membersihkan semua state kecuali token...");
    dispatch({ type: "RESET_APP_STATE" }); // ✅ Reset semua state kecuali token
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw", // Agar tidak melebihi layar
      }}
    >
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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "100%", // Tidak melebihi lebar layar
            px: 2, // Padding horizontal
          }}
        >
          {/* Left Section: Back, Divider, Home, Page Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Tombol Home */}
            <IconButton color="inherit" onClick={handleGoHome} edge="start">
              <HomeIcon />
            </IconButton>

            {/* Divider Vertikal */}
            <Divider orientation="vertical" flexItem />

            {/* Tombol Back */}
            <IconButton
              color="inherit"
              onClick={handleBack}
              edge="start"
              sx={{ mx: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>

            {/* Judul Halaman */}
            <Typography
              variant="h5"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1rem", // Ukuran font lebih kecil di layar kecil
                },
                fontSize: "1.5rem", // Ukuran font normal
                ml: 1,
              }}
            >
              {pageTitle}
            </Typography>
          </Box>

          {/* Right Section: Avatar and Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" sx={{ mx: 1 }}>
              <MdCircleNotifications size={24} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                mx: 1,
                [theme.breakpoints.down("sm")]: {
                  display: "none", // Sembunyikan nama user di layar kecil
                },
              }}
            >
              {nama_lengkap}
            </Typography>
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                alt="User Profile"
                src={foto_profil || DefaultLogo} // Gunakan foto_profil jika ada, jika tidak gunakan DefaultLogo
              />{" "}
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default CustomAppBar;
