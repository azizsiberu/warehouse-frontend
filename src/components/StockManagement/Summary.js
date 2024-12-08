// path: src/components/StockManagement/Summary.js
import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Paper, Grid } from "@mui/material";

const Summary = ({ stocks, onFilterByWarehouse, onFilterByCategory }) => {
  // Hitung total stok per gudang
  const stocksByWarehouse = stocks.reduce((acc, stock) => {
    const warehouse = stock.warehouse_lokasi || "Tidak Diketahui";
    acc[warehouse] = (acc[warehouse] || 0) + stock.stok_tersedia;
    return acc;
  }, {});

  // Hitung total stok per kategori
  const stocksByCategory = stocks.reduce((acc, stock) => {
    const category = stock.kategori || "Tidak Diketahui";
    acc[category] = (acc[category] || 0) + stock.stok_tersedia;
    return acc;
  }, {});

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Ringkasan Stok
      </Typography>
      <Grid container spacing={2}>
        {/* Ringkasan Gudang */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Total Stok per Gudang
            </Typography>
            {Object.entries(stocksByWarehouse).map(([warehouse, total]) => (
              <Box
                key={warehouse}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => onFilterByWarehouse(warehouse)}
              >
                <Typography>{warehouse}</Typography>
                <Typography>{total}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Ringkasan Kategori */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Total Stok per Kategori
            </Typography>
            {Object.entries(stocksByCategory).map(([category, total]) => (
              <Box
                key={category}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={() => onFilterByCategory(category)}
              >
                <Typography>{category}</Typography>
                <Typography>{total}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

Summary.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      warehouse_lokasi: PropTypes.string,
      kategori: PropTypes.string,
      stok_tersedia: PropTypes.number.isRequired,
    })
  ).isRequired,
  onFilterByWarehouse: PropTypes.func.isRequired,
  onFilterByCategory: PropTypes.func.isRequired,
};

export default Summary;
