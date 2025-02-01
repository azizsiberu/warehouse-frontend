// path: src/components/ScheduleManagement/Confirmation/ConfirmationHeader.js
import React from "react";
import { Box, Typography } from "@mui/material";

const ConfirmationHeader = ({ schedule }) => {
  return (
    <Box sx={{ marginBottom: 2, padding: 2, borderBottom: "1px solid #ddd" }}>
      <Typography variant="h6" fontWeight="bold">
        Tujuan Pengiriman
      </Typography>
      <Typography>Nama Sales: {schedule.sales_name}</Typography>
      <Typography>Nama Pelanggan: {schedule.nama_pelanggan}</Typography>
      <Typography>No HP: {schedule.nomor_hp}</Typography>
      <Typography>Alamat: {schedule.alamat_lengkap}</Typography>
      <Typography>Tanggal Pengiriman: {schedule.tanggal_pengiriman}</Typography>
    </Box>
  );
};

export default ConfirmationHeader;
