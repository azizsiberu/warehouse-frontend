// path: /src/components/auth/VerifyCode.js
import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";

const VerifyCode = () => {
  const [code, setCode] = useState("");

  const handleVerifyCode = () => {
    // Tambahkan logika untuk memverifikasi kode
    console.log("Verifying code", code);
    // Anda bisa menambahkan navigasi ke halaman berikutnya jika kode berhasil diverifikasi
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
        >
          Verifikasi
        </Button>
        <Typography variant="body1">
          Tidak menerima kode? <Link to="#">Kirim ulang kode</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default VerifyCode;
