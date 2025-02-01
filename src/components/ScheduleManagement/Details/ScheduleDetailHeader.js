import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSelector } from "react-redux";
import SelectedStockDrawer from "./SelectedStockDrawer";

const ScheduleDetailHeader = ({ schedule }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  // Ambil stok terpilih dari Redux
  const selectedStock = useSelector((state) => state.schedules.selectedStock);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box
      sx={{
        paddingBottom: 3,
        borderBottom: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography>Nama Pelanggan</Typography>
              <Typography>No HP</Typography>
              <Typography>Nama Sales</Typography>
            </Grid>
            <Grid size={6}>
              <Typography>: {schedule.nama_pelanggan}</Typography>
              <Typography>: {schedule.nomor_hp}</Typography>
              <Typography>: {schedule.sales_name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography>Tanggal Pemesanan</Typography>
              <Typography>Request Pengiriman</Typography>
              <Typography>Status Pembayaran</Typography>
            </Grid>
            <Grid size={6}>
              <Typography>
                : {formatDate(schedule.tanggal_transaksi)}
              </Typography>
              <Typography>
                : {formatDate(schedule.tanggal_pengiriman)}
              </Typography>
              <Typography>: {schedule.status_pembayaran}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Tombol "Lihat Stok Terpilih" */}
      {selectedStock.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDrawerOpen(true)}
        >
          Lihat Stok Terpilih ({selectedStock.length})
        </Button>
      )}

      {/* **Gunakan Drawer yang Sudah Ada** */}
      <SelectedStockDrawer
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  );
};

export default ScheduleDetailHeader;
