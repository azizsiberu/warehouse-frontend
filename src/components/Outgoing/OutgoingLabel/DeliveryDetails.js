// Path: /src/components/Outgoing/OutgoingLabel/DeliveryDetails.js

import React from "react";
import { Box, Typography } from "@mui/material";

const DeliveryDetails = ({ deliveryData }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Delivery Details
      </Typography>
      {deliveryData.type === "kurirSendiri" ? (
        <>
          <Typography variant="body2">
            Driver: {deliveryData.data.driver?.nama}
          </Typography>
          <Typography variant="body2">
            Kendaraan: {deliveryData.data.vehicle?.nomor_polisi}
          </Typography>
          <Typography variant="body2">Partners:</Typography>
          <ul>
            {deliveryData.data.partners?.map((partner, index) => (
              <li key={index}>{partner.nama}</li>
            ))}
          </ul>
        </>
      ) : (
        <Typography variant="body2">
          Ekspedisi: {deliveryData.data?.name || "Tidak diketahui"}
        </Typography>
      )}
    </Box>
  );
};

export default DeliveryDetails;
