// path: /src/components/auth/ResetPassword.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Logika untuk memperbarui sandi pengguna
    console.log('Resetting password to', newPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Perbarui Sandi
        </Typography>
        <TextField
          label="Sandi Baru"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Konfirmasi Sandi Baru"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetPassword}
          fullWidth
          sx={{ mt: 3 }}
        >
          Perbarui Sandi
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
