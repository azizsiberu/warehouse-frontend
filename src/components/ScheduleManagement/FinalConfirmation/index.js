// path: src/components/ScheduleManagement/FinalConfirmation/index.js
import React, { useEffect } from "react";
import { Box, Paper } from "@mui/material";
import FinalConfirmationHeader from "./FinalConfirmationHeader";
import FinalConfirmationProductList from "./FinalConfirmationProductList";
import FinalConfirmationActions from "./FinalConfirmationActions";
import DeliveryOption from "../../Outgoing/OutgoingDetail/DeliveryOption";

const FinalScheduleConfirmation = ({
  schedule,
  selectedStocks,
  onCancel,
  onConfirm,
}) => {
  // 🔍 Log debugging untuk melihat data saat komponen dimuat
  useEffect(() => {
    console.log(
      "📌 [FinalScheduleConfirmation] Data Jadwal Diterima:",
      schedule
    );
    console.log(
      "📌 [FinalScheduleConfirmation] Produk Terpilih:",
      selectedStocks
    );
  }, [schedule, selectedStocks]);

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <FinalConfirmationHeader schedule={schedule} />
        <FinalConfirmationProductList selectedStocks={selectedStocks} />
        <DeliveryOption onSave={console.log} />
        <FinalConfirmationActions onCancel={onCancel} onConfirm={onConfirm} />
      </Paper>
    </Box>
  );
};

export default FinalScheduleConfirmation;
