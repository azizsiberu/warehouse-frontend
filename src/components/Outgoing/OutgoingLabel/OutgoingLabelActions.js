// Path: /src/components/Outgoing/OutgoingLabel/OutgoingLabelActions.js

import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OutgoingLabelActions = () => {
  const navigate = useNavigate();
  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 2,
        display: "flex",
        backgroundColor: "#fff",
        py: 2,
        zIndex: 10,
        borderTop: "1px solid #ddd",
        justifyContent: "flex-end",
        gap: 2,
      }}
    >
      {/* Tombol kembali */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleBack}
        sx={{ textTransform: "none" }}
      >
        Kembali
      </Button>

      {/* Tombol cetak */}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={{ textTransform: "none" }}
      >
        Cetak Label
      </Button>
    </Box>
  );
};

export default OutgoingLabelActions;
