// path: src/components/Overview/LowStockWarning.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TablePagination,
} from "@mui/material";

const LowStockWarning = ({ lowStock }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!lowStock || lowStock.length === 0) return null;

  // Hitung indeks awal dan akhir untuk pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedLowStock = lowStock.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset ke halaman pertama saat jumlah baris berubah
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="error">
        Peringatan Stok Rendah
      </Typography>
      <List>
        {paginatedLowStock.map((item, index) => (
          <ListItem key={`low-stock-${index}`}>
            <ListItemText
              primary={item.product_name}
              secondary={`Stok Tersedia: ${item.stok_tersedia}, Lokasi: ${item.warehouse_name}`}
            />
          </ListItem>
        ))}
      </List>
      <TablePagination
        component="div"
        count={lowStock.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]} // Opsi jumlah baris per halaman
        labelRowsPerPage="Baris per halaman"
      />
    </Box>
  );
};

export default LowStockWarning;
