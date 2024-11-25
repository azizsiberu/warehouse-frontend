// path: /src/components/Outgoing/WarehouseSelector.js
import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchWarehouses } from "../../redux/reducers/warehouseReducer";

const WarehouseSelector = ({ selectedLocation, onLocationChange }) => {
  const dispatch = useDispatch();
  const {
    locations: warehouses,
    loading,
    error,
  } = useSelector((state) => state.warehouses);

  useEffect(() => {
    // Ambil daftar gudang melalui Redux saat komponen dimuat
    dispatch(fetchWarehouses());
  }, [dispatch]);

  // Tangani perubahan gudang yang dipilih
  const handleLocationSelect = (event) => {
    const locationId = event.target.value;
    const selectedWarehouse = warehouses.find(
      (warehouse) => warehouse.id === locationId
    );
    onLocationChange(selectedWarehouse);
  };

  return (
    <Box>
      <FormControl fullWidth variant="outlined" size="small" disabled={loading}>
        <InputLabel id="warehouse-select-label">
          {loading ? "Memuat..." : "Pilih Gudang"}
        </InputLabel>
        <Select
          labelId="warehouse-select-label"
          id="warehouse-select"
          value={selectedLocation?.id || ""}
          onChange={handleLocationSelect}
          label="Pilih Gudang"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {warehouses.map((warehouse) => (
            <MenuItem key={warehouse.id} value={warehouse.id}>
              {warehouse.lokasi}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Gagal memuat data gudang. Silakan coba lagi.
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default WarehouseSelector;
