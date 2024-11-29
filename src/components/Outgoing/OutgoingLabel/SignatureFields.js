// Path: /src/components/Outgoing/OutgoingLabel/SignatureFields.js

import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSelector } from "react-redux";

const SignatureFields = () => {
  const namaLengkap = useSelector(
    (state) => state.auth?.profile?.nama_lengkap || "Tidak diketahui"
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tanda Tangan
      </Typography>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Typography align="center">Penerima</Typography>
          <Box sx={{ borderBottom: "1px solid #000", height: "80px" }} />
        </Grid>
        <Grid size={4}>
          <Typography align="center">Pengirim</Typography>
          <Box sx={{ borderBottom: "1px solid #000", height: "80px" }} />
        </Grid>
        <Grid size={4}>
          <Typography align="center">Admin Gudang</Typography>
          <Box sx={{ borderBottom: "1px solid #000", height: "80px" }} />
          <Typography align="center"> {namaLengkap}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignatureFields;
