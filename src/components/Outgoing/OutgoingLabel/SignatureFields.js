// Path: /src/components/Outgoing/OutgoingLabel/SignatureFields.js

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const SignatureFields = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tanda Tangan
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ border: "1px solid #000", height: "60px" }} />
          <Typography align="center">Penerima</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ border: "1px solid #000", height: "60px" }} />
          <Typography align="center">Pengirim</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ border: "1px solid #000", height: "60px" }} />
          <Typography align="center">Admin Gudang</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignatureFields;
