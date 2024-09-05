// path: /src/components/auth/ForgotPasswordDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    // Tambahkan logika untuk mengirim kode verifikasi ke email
    console.log("Sending verification code to", email);
    // Setelah mengirim kode, Anda bisa menutup dialog atau menampilkan pesan konfirmasi
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Lupa Sandi</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Masukkan email Anda untuk menerima kode verifikasi.
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Batal
        </Button>
        <Button onClick={handleSendCode} color="primary" variant="contained">
          Kirim Kode
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
