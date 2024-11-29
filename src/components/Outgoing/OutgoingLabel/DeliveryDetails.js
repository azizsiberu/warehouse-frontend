// Path: /src/components/Outgoing/OutgoingLabel/DeliveryDetails.js

import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const DeliveryDetails = ({ deliveryData }) => {
  // Format tanggal dalam bahasa Indonesia
  const today = format(new Date(), "eeee, dd/MM/yy", { locale: id });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Delivery Details
      </Typography>
      <Grid container spacing={2}>
        {/* Labels */}
        <Grid size={6}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {deliveryData.type === "kurirSendiri" ? "Driver" : "Ekspedisi"}
          </Typography>
          {deliveryData.type === "kurirSendiri" && (
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Kendaraan
            </Typography>
          )}
          {deliveryData.type === "kurirSendiri" &&
            deliveryData.data.partners?.length > 0 && (
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Partner
              </Typography>
            )}
          <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
            Tanggal Dikirim
          </Typography>
        </Grid>

        {/* Values */}
        <Grid size={6}>
          <Typography variant="body2">
            :{" "}
            {deliveryData.type === "kurirSendiri"
              ? deliveryData.data.driver?.nama || "-"
              : deliveryData.data.name || "-"}
          </Typography>
          {deliveryData.type === "kurirSendiri" && (
            <Typography variant="body2">
              : {deliveryData.data.vehicle?.nomor_polisi || "-"}
            </Typography>
          )}
          {deliveryData.type === "kurirSendiri" &&
            deliveryData.data.partners?.length > 0 && (
              <Typography variant="body2">
                :{" "}
                {deliveryData.data.partners
                  .map((partner) => partner.nama)
                  .join(", ")}
              </Typography>
            )}
          <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
            {" "}
            : {today}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeliveryDetails;
