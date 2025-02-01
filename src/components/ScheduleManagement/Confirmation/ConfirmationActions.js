// path: src/components/ScheduleManagement/Confirmation/ConfirmationActions.js
import React from "react";
import { Box, Button } from "@mui/material";

const ConfirmationActions = ({ onCancel, onConfirm }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}
    >
      <Button variant="outlined" color="error" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Konfirmasi Jadwal
      </Button>
    </Box>
  );
};

export default ConfirmationActions;
