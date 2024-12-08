// path: src/components/StockManagement/StockActions.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const StockActions = ({ stock }) => {
  const [quantity, setQuantity] = useState("");

  const handleAddStock = () => {
    console.log("Adding stock:", stock.id, quantity);
    // Add stock logic here
  };

  const handleRemoveStock = () => {
    console.log("Removing stock:", stock.id, quantity);
    // Remove stock logic here
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Aksi Stok
      </Typography>
      <TextField
        label="Jumlah"
        type="number"
        variant="outlined"
        fullWidth
        size="small"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddStock}>
          Tambah Stok
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveStock}
        >
          Kurangi Stok
        </Button>
      </Box>
    </Box>
  );
};

export default StockActions;
