import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const StockTable = ({ stocks, loading, error }) => {
  // Hitung total stok per gudang
  const stocksByWarehouse = stocks.reduce((acc, stock) => {
    const warehouse = stock.warehouse_lokasi || "Lokasi Tidak Diketahui";
    acc[warehouse] = (acc[warehouse] || 0) + stock.stok_tersedia;
    return acc;
  }, {});

  // Hitung total stok per kategori
  const stocksByCategory = stocks.reduce((acc, stock) => {
    const category = stock.kategori || "Kategori Tidak Diketahui";
    acc[category] = (acc[category] || 0) + stock.stok_tersedia;
    return acc;
  }, {});

  // Total keseluruhan stok
  const totalStocks = stocks.reduce(
    (acc, stock) => acc + stock.stok_tersedia,
    0
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography variant="h6" color="error">
          {`Error: ${error}`}
        </Typography>
      </Box>
    );
  }

  if (stocks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Tidak ada produk yang tersedia.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Ringkasan Gudang */}
        <Grid size={6} component={Paper} sx={{ p: 2, bgcolor: "white" }}>
          <Typography variant="subtitle1" gutterBottom>
            Total Stok : {totalStocks}
          </Typography>
          {Object.entries(stocksByWarehouse).map(([warehouse, total]) => (
            <Box
              key={warehouse}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>{warehouse}</Typography>
              <Typography>{total}</Typography>
            </Box>
          ))}
        </Grid>

        {/* Ringkasan Kategori */}
        <Grid size={6} component={Paper} sx={{ p: 2, bgcolor: "white" }}>
          <Typography variant="subtitle1" gutterBottom>
            Total Kategori
          </Typography>
          {Object.entries(stocksByCategory).map(([category, total]) => (
            <Box
              key={category}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>{category}</Typography>
              <Typography>{total}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Tabel Stok */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>Warna</TableCell>
              <TableCell>Finishing</TableCell>
              <TableCell>Gudang</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Dipesan</TableCell>
              <TableCell>Ready</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, index) => {
              const stokReady = stock.stok_tersedia - stock.stok_dipesan; // Hitung stok ready

              return (
                <TableRow key={stock.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{stock.nama}</TableCell>
                  <TableCell>{stock.kategori}</TableCell>
                  <TableCell>{stock.final_warna}</TableCell>
                  <TableCell>{stock.final_finishing}</TableCell>
                  <TableCell>{stock.warehouse_lokasi}</TableCell>
                  <TableCell>{stock.stok_tersedia}</TableCell>
                  <TableCell>{stock.stok_dipesan}</TableCell>
                  <TableCell>{stokReady}</TableCell>{" "}
                  {/* Tampilkan stok ready */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockTable;
