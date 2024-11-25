// path: /src/components/Outgoing/OutgoingDetail/OutgoingSummaryActions.js
import React, { useState } from "react";
import { Button, Box, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OutgoingSummaryActions = ({ onCancel, onSubmit }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: "#fff",
        py: 2,
        zIndex: 10,
        borderTop: "1px solid #ddd",
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid size={{ xs: 6, md: 3 }}>
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              console.log("Button clicked: Calling onSubmit");
              onSubmit?.(); // Panggil fungsi `onSubmit` dari induk
            }}
            startIcon={<MdSend />}
          >
            Kirim
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OutgoingSummaryActions;
