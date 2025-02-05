import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import FinalConfirmationHeader from "./FinalConfirmationHeader";
import FinalConfirmationProductList from "./FinalConfirmationProductList";
import FinalConfirmationActions from "./FinalConfirmationActions";
import DeliveryOption from "../../Outgoing/OutgoingDetail/DeliveryOption";

const FinalScheduleConfirmation = ({
  schedule,
  selectedStocks,
  onConfirm,
  onDeliveryData, // callback diterima dari container
  onCancel,
}) => {
  useEffect(() => {
    // Log debugging jika diperlukan
  }, [schedule, selectedStocks]);

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <FinalConfirmationHeader schedule={schedule} />
        <FinalConfirmationProductList selectedStocks={selectedStocks} />
        {/* DeliveryOption dirender di sini, tapi datanya dikirim melalui callback onDeliveryData */}
        <DeliveryOption onSave={onDeliveryData} />
        <FinalConfirmationActions onCancel={onCancel} onConfirm={onConfirm} />
      </Paper>
    </Box>
  );
};

export default FinalScheduleConfirmation;
