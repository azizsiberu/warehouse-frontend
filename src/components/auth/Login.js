// path: /src/components/auth/Login.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleLogin = () => {
    // Tambahkan logika untuk menangani login
    console.log("Logging in with", email, password);
  };

  const handleForgotPasswordOpen = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 4,
          p: 2,
        }}
      >
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
            src={LogoWebp}
            alt="Logo"
            width="64"
            height="64"
            style={{ borderRadius: 4 }}
          />
          <Typography variant="h4" sx={{ mt: 2 }}>
            Warehouse Management System
          </Typography>
          <Typography variant="h6">
            {" "}
            Silahkan masuk untuk melanjutkan
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body1" textAlign={"right"}>
          <Link onClick={handleForgotPasswordOpen}>Lupa Sandi?</Link>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>
        <Typography variant="body1">
          Belum punya akun? <Link to="/register">Daftar disini</Link>
        </Typography>
      </Box>
      {/* Dialog Lupa Sandi */}
      <ForgotPasswordDialog
        open={isForgotPasswordOpen}
        onClose={handleForgotPasswordClose}
      />
    </Box>
  );
};

export default Login;
