// path: /src/components/Receiving/StockForm.js
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const StockForm = ({ product, onSave, onCancel }) => {
  const [stock, setStock] = useState(product ? product.stock : "");

  const handleSubmit = () => {
    // Simpan stok baru
    onSave({ stock });
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Jumlah Stok"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Simpan
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Batal
        </Button>
      </Box>
    </Box>
  );
};

export default StockForm;
