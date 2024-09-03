// path: /src/components/auth/Register.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Tambahkan logika untuk menangani pendaftaran
    console.log('Registering with', email, password);
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
          Daftar
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
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Konfirmasi Password"
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
          onClick={handleRegister}
          fullWidth
          sx={{ mt: 3 }}
        >
          Daftar
        </Button>
        <Box mt={2}>
          <Link to="/login">Sudah punya akun? Masuk</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
