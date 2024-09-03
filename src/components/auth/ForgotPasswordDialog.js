// path: /src/components/auth/ForgotPasswordDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    // Logika untuk mengirim kode verifikasi ke email pengguna
    console.log('Sending verification code to', email);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lupa Sandi</DialogTitle>
      <DialogContent>
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
        <Button onClick={onClose}>Batal</Button>
        <Button onClick={handleSendCode} color="primary">
          Kirim Kode
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
