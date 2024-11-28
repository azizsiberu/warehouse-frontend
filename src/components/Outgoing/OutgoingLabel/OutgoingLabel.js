// Path: /src/components/Outgoing/OutgoingLabel/OutgoingLabel.js

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import ShippingDetails from "./ShippingDetails";
import DeliveryDetails from "./DeliveryDetails";
import ProductList from "./ProductList";
import SignatureFields from "./SignatureFields";
import OutgoingLabelActions from "./OutgoingLabelActions";

const OutgoingLabel = ({
  selectedProducts,
  selectedDestination,
  deliveryData,
}) => {
  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Label Pengiriman
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Shipping and Delivery Details */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <ShippingDetails selectedDestination={selectedDestination} />
        <DeliveryDetails deliveryData={deliveryData} />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Product List */}
      <ProductList selectedProducts={selectedProducts} />

      <Divider sx={{ my: 3 }} />

      {/* Signature Fields */}
      <SignatureFields />

      <Divider sx={{ my: 3 }} />

      {/* Actions */}
      <OutgoingLabelActions />
    </Box>
  );
};

export default OutgoingLabel;
