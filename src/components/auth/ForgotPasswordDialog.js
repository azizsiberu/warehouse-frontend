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
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSendCode = () => {
    dispatch(forgotPasswordThunk(email)).then((result) => {
      if (!result.error) {
        alert("Kode verifikasi telah dikirim ke email Anda.");
        onClose(); // Tutup dialog setelah berhasil
        navigate("/verify-code", { state: { email } }); // Navigasi ke halaman verifikasi kode
      }
    });
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
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Batal
        </Button>
        <Button
          onClick={handleSendCode}
          color="primary"
          variant="contained"
          disabled={loading} // Nonaktifkan tombol saat loading
        >
          {loading ? "Mengirim..." : "Kirim Kode"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
