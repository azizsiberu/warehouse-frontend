// path: src/components/ScheduleManagement/FinalConfirmation/FinalConfirmationActions.js
import React from "react";
import { Box, Button } from "@mui/material";

const FinalConfirmationActions = ({ onCancel, onConfirm }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          console.log("❌ [FinalConfirmationActions] Tombol Batal ditekan");
          onCancel();
        }}
      >
        Batal
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log(
            "✅ [FinalConfirmationActions] Tombol Konfirmasi ditekan"
          );
          onConfirm();
        }}
      >
        Konfirmasi
      </Button>
    </Box>
  );
};

export default FinalConfirmationActions;
