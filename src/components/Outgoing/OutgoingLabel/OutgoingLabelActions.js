// Path: /src/components/Outgoing/OutgoingLabel/OutgoingLabelActions.js

import React from "react";
import { Box, Button } from "@mui/material";

const OutgoingLabelActions = ({ onPrint }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={onPrint}
        sx={{ textTransform: "none" }}
      >
        Cetak Label
      </Button>
    </Box>
  );
};

export default OutgoingLabelActions;
