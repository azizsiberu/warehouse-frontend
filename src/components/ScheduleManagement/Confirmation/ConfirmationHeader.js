// path: src/components/ScheduleManagement/Confirmation/ConfirmationHeader.js
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ConfirmationHeader = ({ schedule }) => {
  // Helper function to capitalize each word properly
  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        padding: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="body1">Sales</Typography>
              <Typography variant="body1">Pelanggan</Typography>
              <Typography variant="body1">No HP</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">
                : {capitalizeWords(schedule.sales_name)}
              </Typography>
              <Typography variant="body1">
                : {capitalizeWords(schedule.nama_pelanggan)}
              </Typography>
              <Typography variant="body1">: {schedule.nomor_hp}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            value={capitalizeWords(
              `${schedule.alamat_pelanggan}, ${schedule.kelurahan}, ${schedule.kecamatan}, ${schedule.kabupaten}, ${schedule.provinsi}`
            )}
            multiline
            size="small"
            rows={4}
            fullWidth
            label="Alamat"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="body1">Tanggal Pengiriman</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body1">
                : {formatDate(schedule.tanggal_pengiriman)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmationHeader;
