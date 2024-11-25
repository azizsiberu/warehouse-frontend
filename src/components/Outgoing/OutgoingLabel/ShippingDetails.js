//path: src/components/Outgoing/OutgoingLabel/ShippingDetails.js
import React from "react";
import { Box, Typography } from "@mui/material";

const ShippingDetails = ({ selectedDestination }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Tujuan Pengiriman
      </Typography>
      <Typography variant="body1">
        Jenis Tujuan:{" "}
        {selectedDestination.type === "gudang" ? "Gudang" : "Pelanggan"}
      </Typography>
      {selectedDestination.type === "pelanggan" && (
        <>
          <Typography variant="body1">
            Nama Pelanggan: {selectedDestination.name || "-"}
          </Typography>
          <Typography variant="body1">
            Alamat: {selectedDestination.address || "-"}
          </Typography>
        </>
      )}
      {selectedDestination.type === "gudang" && (
        <Typography variant="body1">
          Nama Gudang: {selectedDestination.name || "-"}
        </Typography>
      )}
    </Box>
  );
};

export default ShippingDetails;
