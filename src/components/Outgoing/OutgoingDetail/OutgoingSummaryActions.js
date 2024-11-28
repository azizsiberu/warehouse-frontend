// path: /src/components/Outgoing/OutgoingDetail/OutgoingSummaryActions.js

import React from "react";
import { Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdSend } from "react-icons/md";

const OutgoingSummaryActions = ({ onCancel, onSubmit, isSubmitDisabled }) => {
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
        {/* Tombol Cancel */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        </Grid>

        {/* Tombol Submit */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              console.log("Submit button clicked: Calling onSubmit");
              onSubmit?.(); // Memanggil fungsi `onSubmit` dari parent
            }}
            disabled={isSubmitDisabled} // Nonaktifkan tombol jika data tidak lengkap
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
