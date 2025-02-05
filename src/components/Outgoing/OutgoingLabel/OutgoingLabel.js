// Path: /src/components/Outgoing/OutgoingLabel/OutgoingLabel.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShippingDetails from "./ShippingDetails";
import DeliveryDetails from "./DeliveryDetails";
import ProductList from "./ProductList";
import SignatureFields from "./SignatureFields";
import OutgoingLabelActions from "./OutgoingLabelActions";
import LabelHeader from "./LabelHeader.js";

const OutgoingLabel = (props) => {
  const location = useLocation();
  const {
    selectedProducts = location.state?.selectedProducts || [],
    selectedDestination = location.state?.selectedDestination || {},
    deliveryData = location.state?.deliveryData || {},
  } = props;

  console.log("📌 [OutgoingLabel] Data yang diterima:", {
    selectedProducts,
    selectedDestination,
    deliveryData,
  });

  return (
    <Box
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
        maxWidth: 800,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <Box className="printable-content">
        {/* Tambahkan <style> untuk media print */}
        <style>
          {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-content, .printable-content * {
              visibility: visible;
            }
            .printable-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
        </style>

        {/* Header */}
        <LabelHeader />
        <Divider sx={{ my: 1 }} />

        {/* Shipping and Delivery Details */}
        <Grid container spacing={2}>
          <Grid size={6}>
            <ShippingDetails selectedDestination={selectedDestination} />
          </Grid>
          <Grid size={6}>
            <DeliveryDetails deliveryData={deliveryData} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Product List */}
        <ProductList selectedProducts={selectedProducts} />

        <Divider sx={{ my: 3 }} />

        {/* Signature Fields */}
        <SignatureFields />

        <Divider sx={{ my: 3 }} />
      </Box>
      {/* Actions */}
      <OutgoingLabelActions className="no-print" />
    </Box>
  );
};

export default OutgoingLabel;
