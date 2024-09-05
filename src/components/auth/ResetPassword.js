// path: /src/components/auth/ResetPassword.js
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

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    // Tambahkan logika untuk memperbarui sandi pengguna
    console.log("Resetting password to", newPassword);
    // Anda bisa menambahkan navigasi ke halaman login setelah reset password berhasil
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
          <Typography variant="h6">Masukkan kata sandi baru Anda</Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Atur Ulang Sandi
        </Typography>

        <TextField
          label="Sandi Baru"
          variant="outlined"
          margin="normal"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Konfirmasi Sandi Baru"
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
          onClick={handleResetPassword}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Perbarui Sandi
        </Button>
        <Typography variant="body1">
          Sudah ingat kata sandi? <Link to="/login">Masuk disini</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
