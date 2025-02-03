// path: src/components/ScheduleManagement/TableFinal.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import {
  fetchAllFinalSchedules,
  fetchFinalScheduleById,
} from "../../redux/reducers/scheduleReducer";
import { useNavigate } from "react-router-dom";
import FinalScheduleDrawer from "./FinalScheduleDrawer";

const TableFinal = () => {
  const dispatch = useDispatch();
  const finalSchedules =
    useSelector((state) => state.schedules.finalSchedules) || [];

  const loading = useSelector((state) => state.schedules.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch all final schedules on mount
  useEffect(() => {
    dispatch(fetchAllFinalSchedules());
  }, [dispatch]);

  // Filter data based on search term
  const filteredData = Array.isArray(finalSchedules)
    ? finalSchedules.filter((schedule) =>
        schedule.pelanggan?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Fungsi untuk format tanggal ke format yg mudah di baca
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  // 🆕 Open the drawer and fetch details
  const handleOpenDrawer = (id) => {
    setSelectedScheduleId(id);
    setDrawerOpen(true);
    dispatch(fetchFinalScheduleById(id)); // ✅ Fetch detail when opening drawer
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "primary.main",
          p: 2,
          borderRadius: 2,
          color: "white",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Jadwal Akhir</Typography>
        <TextField
          size="small"
          label="Cari Nama Pelanggan"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
          }}
        />
      </Box>
      <TableContainer sx={{ mt: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.200" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Sales</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lokasi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Produk</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Tanggal Pengiriman
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.sales}</TableCell>
                  <TableCell>{schedule.pelanggan}</TableCell>
                  <TableCell>{schedule.lokasi}</TableCell>
                  <TableCell>{schedule.nama_produk}</TableCell>
                  <TableCell>
                    {formatDate(schedule.tanggal_pengiriman)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDrawer(schedule.schedule_id)}
                    >
                      Kirim
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Tidak ada data jadwal akhir.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📌 FinalScheduleDrawer Component */}
      <FinalScheduleDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        scheduleId={selectedScheduleId}
      />
    </Box>
  );
};

export default TableFinal;
