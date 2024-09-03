// path: /src/components/auth/VerifyCode.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const VerifyCode = () => {
  const [code, setCode] = useState('');

  const handleVerifyCode = () => {
    // Logika untuk verifikasi kode
    console.log('Verifying code', code);
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
          sx={{ mt: 3 }}
        >
          Verifikasi
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyCode;
