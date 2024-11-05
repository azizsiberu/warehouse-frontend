// path: /src/components/Receiving/ReceivingDetail/ReceivingDetail.js
import React from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SelectedProductList from "./SelectedProductList";
import SummaryActions from "./SummaryActions";
import Grid from "@mui/material/Grid2";

const ReceivingDetail = ({ selectedProducts, selectedLocation }) => {
  const navigate = useNavigate();

  const handleCancel = () => navigate(-1); // Kembali ke halaman sebelumnya

  const handleSubmit = () => {
    // Logika submit ke database bisa ditambahkan di sini
    console.log("Data submitted:", { selectedProducts, selectedLocation });
    console.log(
      "Selected Products:",
      JSON.stringify(selectedProducts, null, 2)
    );

    alert("Data berhasil dikirim!");
    navigate("/receiving");
  };

  return (
    <Box sx={{ margin: "0 auto" }}>
      <Chip label={`Lokasi: ${selectedLocation?.lokasi}`} color="primary" />
      <Divider sx={{ my: 1 }} />

      <SelectedProductList selectedProducts={selectedProducts} />

      <SummaryActions
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        selectedProducts={selectedProducts}
        selectedLocation={selectedLocation}
      />
    </Box>
  );
};

export default ReceivingDetail;
