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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk } from "../../redux/reducers/authReducer";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  // Ambil email dari location.state atau redirect jika tidak tersedia
  const email = location.state?.email;
  if (!email) {
    navigate("/forgot-password");
  }

  const handleResetPassword = () => {
    // Validasi kecocokan password
    if (newPassword !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }

    // Panggil resetPasswordThunk dengan email dan newPassword
    dispatch(resetPasswordThunk({ email, newPassword })).then((result) => {
      if (!result.error) {
        alert("Password berhasil diperbarui. Silahkan login.");
        navigate("/login");
      }
    });
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
          disabled={loading}
        >
          {loading ? "Memperbarui..." : "Perbarui Sandi"}
        </Button>
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
        <Typography variant="body1">
          Sudah ingat kata sandi? <Link to="/login">Masuk disini</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
