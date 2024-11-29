// Path: /src/components/Outgoing/OutgoingLabel/LabelHeader.js

import React from "react";
import { Box, Typography } from "@mui/material";
import DefaultLogo from "../../../assets/logo/logo-ajeg-hijau@2x.svg"; // Pastikan path logo benar

const LabelHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={DefaultLogo}
        alt="Ajeg Furniture Logo"
        sx={{
          width: 80, // Ukuran logo
          height: "auto",
          m: 2,
          borderRadius: 1,
        }}
      />

      {/* Informasi Perusahaan */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Ajeg Furniture
        </Typography>
        <Typography variant="body2">
          Alamat: Jl. Yogyakarta - Solo, KM 10, Sorogenen, Kalasan, Sleman.
          55571
        </Typography>
        <Typography variant="body2">Telp: 0877-3907-0444</Typography>
      </Box>
    </Box>
  );
};

export default LabelHeader;
