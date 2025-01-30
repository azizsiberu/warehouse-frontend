// path: src/components/ScheduleManagement/TableTemporary.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchSchedules } from "../../redux/reducers/scheduleReducer"; // Import action fetchSchedules
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";

const TableTemporary = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.schedules); // Ambil state jadwal sementara

  useEffect(() => {
    dispatch(fetchSchedules()); // Memanggil fetchSchedules saat komponen dimount
  }, [dispatch]);

  const navigate = useNavigate();

  const [selected, setSelected] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState(""); // State for storing the search term

  const handleRowClick = (scheduleId) => {
    navigate(`/schedule/${scheduleId}`);
  };

  const handleSelect = (scheduleId) => {
    setSelected((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((id) => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  // Filter data based on search term
  const filteredData = list.filter((schedule) =>
    schedule.nama_pelanggan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "secondary.main",
          p: 2,
          borderRadius: 2,
          color: "black",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ flexShrink: 0 }}>
          Jadwal Sementara
        </Typography>
        <TextField
          fullWidth
          size="small"
          label="Cari Nama Pelanggan"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            ml: 2,
          }}
        />
      </Box>
      <TableContainer sx={{ mt: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.200" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Sales</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Tanggal Pengiriman
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lokasi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Produk</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((schedule) => (
              <TableRow
                key={schedule.transaction_id}
                onClick={() => handleRowClick(schedule.transaction_id)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "grey.100" },
                }}
              >
                <TableCell>{schedule.sales_name}</TableCell>
                <TableCell>{schedule.nama_pelanggan}</TableCell>
                <TableCell>{formatDate(schedule.tanggal_pengiriman)}</TableCell>
                <TableCell>{schedule.lokasi}</TableCell>
                <TableCell>{schedule.produk_names.join(" - ")}</TableCell>
                <TableCell>{schedule.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableTemporary;
