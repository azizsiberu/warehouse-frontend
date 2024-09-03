// path: /src/components/auth/Login.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Tambahkan logika untuk menangani login
    console.log('Logging in with', email, password);
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
        <Box > 
        <Typography variant='h4' gutterBottom>
          Selamat Datang
        </Typography>
        <Typography variant='h5'>di Aplikasi Gudang</Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Login
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 3 }}
        >
          Login
        </Button>
        <Box mt={2}>
          <Link to="/register">Belum punya akun? Daftar</Link>
        </Box>
        <Box mt={1}>
          <Link to="#" onClick={() => console.log('Forgot Password Clicked')}>
            Lupa Sandi?
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
