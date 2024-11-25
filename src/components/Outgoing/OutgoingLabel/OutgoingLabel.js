import React from "react";
import { Box, Typography } from "@mui/material";
import ShippingDetails from "./ShippingDetails";
import ProductList from "./ProductList";
import OutgoingLabelActions from "./OutgoingLabelActions";

const OutgoingLabel = ({ selectedProducts, selectedDestination }) => {
  const handlePrint = () => {
    console.log("Mencetak label...");
    window.print();
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Label Pengiriman
      </Typography>

      {/* Detail Tujuan */}
      <ShippingDetails selectedDestination={selectedDestination} />

      {/* Daftar Produk */}
      <ProductList selectedProducts={selectedProducts} />

      {/* Tombol Cetak */}
      <OutgoingLabelActions onPrint={handlePrint} />
    </Box>
  );
};

export default OutgoingLabel;
