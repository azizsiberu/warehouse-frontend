// path: /src/components/auth/VerifyCode.js
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyCodeThunk,
  forgotPasswordThunk,
} from "../../redux/reducers/authReducer";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);
  const [resendLoading, setResendLoading] = useState(false);

  // Pastikan email didapatkan dari state lokasi navigasi
  const email = location.state?.email;

  // Pastikan email tersedia, jika tidak, arahkan kembali ke halaman forgot password
  if (!email) {
    navigate("/forgot-password");
  }

  const handleVerifyCode = () => {
    dispatch(verifyCodeThunk({ email, code })).then((result) => {
      if (!result.error) {
        alert("Kode berhasil diverifikasi!");
        navigate("/reset-password", { state: { email } }); // Teruskan email ke halaman reset password
      }
    });
  };

  const handleResendCode = () => {
    setResendLoading(true);
    dispatch(forgotPasswordThunk(email)).then((result) => {
      if (!result.error) {
        alert("Kode verifikasi baru telah dikirim ke email Anda.");
      }
      setResendLoading(false);
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
          <Typography variant="h6">
            Masukkan kode verifikasi yang telah dikirim ke email Anda
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Verifikasi Kode
        </Typography>

        <TextField
          label="Kode Verifikasi"
          variant="outlined"
          margin="normal"
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerifyCode}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Memverifikasi..." : "Verifikasi"}
        </Button>
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
        <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
          Tidak menerima kode?{" "}
          <Button
            onClick={handleResendCode}
            disabled={resendLoading}
            variant="text"
            color="primary"
          >
            {resendLoading ? "Mengirim Ulang..." : "Kirim ulang kode"}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyCode;
