// path: src/components/StockManagement/Filters.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const Filters = ({
  warehouses,
  stocks,
  onFilterChange, // Callback untuk mengirimkan hasil filter ke parent
}) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(""); // Default: Semua Gudang
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ambil kategori unik dari stok
  const categories = ["All", ...new Set(stocks.map((stock) => stock.kategori))];

  const handleWarehouseChange = (id) => {
    setSelectedWarehouse(id);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedWarehouse("");
    setSearchTerm("");
    setSelectedCategory("All");
  };

  // Terapkan filter gabungan dan kirim hasil ke parent
  useEffect(() => {
    const filteredStocks = stocks.filter((stock) => {
      const matchesWarehouse = selectedWarehouse
        ? stock.id_lokasi === selectedWarehouse
        : true;

      const matchesCategory =
        selectedCategory === "All" || stock.kategori === selectedCategory;

      const matchesSearch = stock.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesWarehouse && matchesCategory && matchesSearch;
    });

    onFilterChange(filteredStocks); // Kirim hasil filter ke parent
  }, [selectedWarehouse, searchTerm, selectedCategory, stocks, onFilterChange]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 10,
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Input Pencarian */}
      <TextField
        fullWidth
        size="small"
        placeholder="Cari Produk"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      {/* Filter Gudang */}
      <Typography variant="subtitle1" gutterBottom>
        Gudang
      </Typography>
      <List>
        <ListItemButton
          selected={!selectedWarehouse}
          onClick={() => handleWarehouseChange("")}
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Semua Gudang" />
        </ListItemButton>
        {warehouses.map((warehouse) => (
          <ListItemButton
            key={warehouse.id}
            selected={selectedWarehouse === warehouse.id}
            onClick={() => handleWarehouseChange(warehouse.id)}
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary={warehouse.lokasi} />
          </ListItemButton>
        ))}
      </List>

      {/* Filter Kategori */}
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
        Kategori
      </Typography>
      <TextField
        fullWidth
        select
        size="small"
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{ mb: 2 }}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

      {/* Tombol Reset Filter */}
      <Button variant="outlined" fullWidth onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </Box>
  );
};

export default Filters;
