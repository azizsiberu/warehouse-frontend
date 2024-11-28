// Path: /src/components/Outgoing/OutgoingLabel/ShippingDetails.js

import React from "react";
import { Box, Typography } from "@mui/material";

const ShippingDetails = ({ selectedDestination }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>
      <Typography variant="body1">
        Tujuan: {selectedDestination.type === "gudang" ? "Gudang" : "Pelanggan"}
      </Typography>
      {selectedDestination.type === "gudang" ? (
        <Typography variant="body2">
          Nama Gudang: {selectedDestination.name}
        </Typography>
      ) : (
        <>
          <Typography variant="body2">
            Nama Pelanggan: {selectedDestination.name}
          </Typography>
          <Typography variant="body2">
            Alamat: {selectedDestination.address}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ShippingDetails;
