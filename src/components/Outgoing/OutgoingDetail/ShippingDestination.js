// path: /src/components/Outgoing/OutgoingDetail/ShippingDestination.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarehouses } from "../../../redux/reducers/warehouseReducer";
import { fetchCustomers } from "../../../redux/reducers/customerReducer";

const ShippingDestination = ({ onSelectDestination, onSelectCustomer }) => {
  const dispatch = useDispatch();

  // Redux state untuk gudang dan pelanggan
  const {
    locations,
    loading: loadingWarehouses,
    error: errorWarehouses,
  } = useSelector((state) => state.warehouses);
  const {
    list: customers,
    loading: loadingCustomers,
    error: errorCustomers,
  } = useSelector((state) => state.customers);

  // Local state
  const [selectedDestination, setSelectedDestination] = useState(""); // Untuk dropdown "Pilih Tujuan"
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Untuk pelanggan yang dipilih

  useEffect(() => {
    console.log("Fetching warehouses and customers...");
    dispatch(fetchWarehouses());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Loaded Warehouses:", locations);
    console.log("Loaded Customers:", customers);
  }, [locations, customers]);

  const handleDestinationChange = (event) => {
    const value = event.target.value;

    console.log("Destination dropdown changed:", value);
    setSelectedDestination(value);

    if (value === "customer") {
      const destination = { type: "pelanggan", id: null };
      onSelectDestination(destination);
      console.log("Dispatching destination (Customer):", destination);
    } else {
      const destination = { type: "gudang", id: value };
      onSelectDestination(destination);
      console.log("Dispatching destination (Warehouse):", destination);
    }

    // Pastikan tidak memanggil onSelectCustomer jika tipe bukan pelanggan
    if (value !== "customer") {
      console.log("Resetting customer selection (Not a customer).");
      setSelectedCustomer(null);
    }
  };

  const handleCustomerSelect = (event, newValue) => {
    console.log("Customer selection changed:", newValue);
    setSelectedCustomer(newValue);

    if (newValue) {
      const customerData = { type: "pelanggan", id: newValue.id };
      console.log("Dispatching customer selection:", customerData);
      onSelectDestination(customerData);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Dropdown Tujuan Pengiriman */}
      <Typography variant="h6" component="h3" gutterBottom>
        Pilih Tujuan Pengiriman
      </Typography>
      <FormControl
        fullWidth
        sx={{ mb: 3 }}
        disabled={loadingWarehouses || !!errorWarehouses}
      >
        <InputLabel id="destination-label">
          {loadingWarehouses
            ? "Memuat..."
            : errorWarehouses
            ? "Gagal Memuat"
            : "Pilih Tujuan"}
        </InputLabel>
        <Select
          labelId="destination-label"
          value={selectedDestination}
          onChange={handleDestinationChange}
          label="Pilih Tujuan"
        >
          {/* Tambahkan opsi Gudang */}
          {locations.map((warehouse) => (
            <MenuItem key={warehouse.id} value={warehouse.id}>
              {warehouse.lokasi}
            </MenuItem>
          ))}

          {/* Tambahkan opsi Pelanggan */}
          <MenuItem value="customer">Pelanggan</MenuItem>
        </Select>
        {errorWarehouses && (
          <Typography variant="body2" color="error">
            {errorWarehouses}
          </Typography>
        )}
      </FormControl>

      {/* Form untuk detail pelanggan (Hanya muncul jika "Pelanggan" dipilih) */}
      {selectedDestination === "customer" && (
        <>
          <Typography variant="h6" component="h3" gutterBottom>
            Pilih Pelanggan
          </Typography>
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.nama_pelanggan}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleCustomerSelect}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.nama_pelanggan}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cari Nama Pelanggan"
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Jika pelanggan dipilih, tampilkan detailnya */}
          {selectedCustomer && (
            <>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <TextField
                    fullWidth
                    label="Sapaan"
                    name="title"
                    size="small"
                    value={selectedCustomer.title || ""}
                    sx={{ mb: 2 }}
                    disabled
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    name="nama"
                    size="small"
                    value={selectedCustomer.nama_pelanggan || ""}
                    sx={{ mb: 2 }}
                    disabled
                  />
                </Grid>
                <Grid size={4}>
                  <TextField
                    fullWidth
                    label="Nomor HP"
                    size="small"
                    name="nomorHp"
                    type="tel"
                    value={selectedCustomer.nomor_hp || ""}
                    sx={{ mb: 2 }}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Provinsi"
                    size="small"
                    name="provinsi"
                    value={selectedCustomer.provinsi || ""}
                    disabled
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Kota"
                    size="small"
                    name="kota"
                    value={selectedCustomer.kabupaten || ""}
                    disabled
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Kecamatan"
                    size="small"
                    name="kecamatan"
                    value={selectedCustomer.kecamatan || ""}
                    disabled
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Kelurahan"
                    size="small"
                    name="kelurahan"
                    value={selectedCustomer.kelurahan || ""}
                    disabled
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Alamat Lengkap"
                size="small"
                name="alamat"
                multiline
                rows={3}
                value={selectedCustomer.alamat_pelanggan || ""}
                sx={{ mb: 2 }}
                disabled
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ShippingDestination;
