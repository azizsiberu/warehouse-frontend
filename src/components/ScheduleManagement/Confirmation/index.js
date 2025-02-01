// path: src/components/ScheduleManagement/Confirmation/index.js
import React from "react";
import { Box } from "@mui/material";
import ConfirmationHeader from "./ConfirmationHeader";
import ConfirmationDetails from "./ConfirmationDetails";
import ConfirmationActions from "./ConfirmationActions";

const ScheduleConfirmation = ({
  schedule,
  selectedStocks,
  onCancel,
  onConfirm,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Header: Tujuan Pengiriman */}
      <ConfirmationHeader schedule={schedule} />

      {/* Detail Produk */}
      <ConfirmationDetails selectedStocks={selectedStocks} />

      {/* Tombol Action */}
      <ConfirmationActions onCancel={onCancel} onConfirm={onConfirm} />
    </Box>
  );
};

export default ScheduleConfirmation;
