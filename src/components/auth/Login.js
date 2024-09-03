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
        justifyContent="center"
        height="100vh"
      >
        <Box sx={{
          display:"flex",
          width:"100%",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"#FFF3D4",
          p:2,
          borderRadius:2,
          mb:2,
        }} > 
        <Typography variant='h4'>
          Selamat Datang di Aplikasi Gudang
        </Typography>
        <Typography variant='h6'> Silahkan masuk untuk melanjutkan</Typography>
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
        <Typography variant='body1' textAlign={"right"}>
        <Link to="#" onClick={() => console.log('Forgot Password Clicked')}>
            Lupa Sandi?
          </Link>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 2, mb:2, }}
        >
          Login
        </Button>
        <Typography variant='body1' >Belum punya akun? 
          <Link to="/register"> Daftar</Link>
          </Typography>
      </Box>
    </Container>
  );
};

export default Login;
