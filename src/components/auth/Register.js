// path: /src/components/auth/Register.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Tambahkan logika untuk menangani registrasi
    console.log("Registering with", fullName, email, phone, password);
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
            Silahkan daftar untuk melanjutkan
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Daftar
        </Typography>

        <TextField
          label="Nama Lengkap"
          variant="outlined"
          margin="normal"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Nomor HP"
          variant="outlined"
          margin="normal"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <TextField
          label="Konfirmasi Password"
          variant="outlined"
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Daftar
        </Button>
        <Typography variant="body1">
          Sudah punya akun? <Link to="/login">Masuk disini</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
