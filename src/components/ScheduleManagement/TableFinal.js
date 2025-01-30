// path: src/components/ScheduleManagement/TableFinal.js
import React, { useState } from "react";
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

const demoFinalData = [
  {
    id: 1,
    customerName: "John Doe",
    date: "2023-01-01",
    location: "Jakarta",
    products: "Produk A - Produk B",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    date: "2023-01-02",
    location: "Bandung",
    products: "Produk C - Produk D",
  },
  {
    id: 3,
    customerName: "Albert Tan",
    date: "2023-01-03",
    location: "Surabaya",
    products: "Produk E",
  },
  {
    id: 4,
    customerName: "Lisa Wong",
    date: "2023-01-04",
    location: "Medan",
    products: "Produk F - Produk G",
  },
  {
    id: 5,
    customerName: "Michael Chan",
    date: "2023-01-05",
    location: "Bali",
    products: "Produk H",
  },
  {
    id: 6,
    customerName: "Susan Lee",
    date: "2023-01-06",
    location: "Makassar",
    products: "Produk I - Produk J",
  },
  {
    id: 7,
    customerName: "David Park",
    date: "2023-01-07",
    location: "Yogyakarta",
    products: "Produk K",
  },
  {
    id: 8,
    customerName: "Anna Kim",
    date: "2023-01-08",
    location: "Semarang",
    products: "Produk L - Produk M",
  },
  {
    id: 9,
    customerName: "Paul Lim",
    date: "2023-01-09",
    location: "Malang",
    products: "Produk N",
  },
  {
    id: 10,
    customerName: "Emily Wang",
    date: "2023-01-10",
    location: "Palembang",
    products: "Produk O - Produk P",
  },
];

const TableFinal = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for storing the search term

  const handleViewDetail = (id) => {
    console.log("View detail for schedule ID:", id);
  };

  // Filter data based on search term
  const filteredData = demoFinalData.filter((schedule) =>
    schedule.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Typography variant="h5" sx={{ flexShrink: 0 }}>
          Jadwal Akhir
        </Typography>
        <TextField
          fullWidth
          size="small"
          label="Cari Nama Pelanggan"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
              <TableCell sx={{ fontWeight: "bold" }}>Nama Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lokasi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Produk</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.customerName}</TableCell>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.location}</TableCell>
                <TableCell>{schedule.products}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewDetail(schedule.id)}
                  >
                    Lihat Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableFinal;
