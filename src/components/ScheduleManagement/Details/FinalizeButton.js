// path: src/components/ScheduleManagement/FinalizeButton.js
import React from "react";
import { Button } from "@mui/material";

const FinalizeButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Finalisasi Jadwal
    </Button>
  );
};

export default FinalizeButton;
