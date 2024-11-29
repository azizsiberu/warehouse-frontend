// Path: /src/components/Outgoing/OutgoingLabel/ShippingDetails.js

import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { fetchCustomers } from "../../../redux/reducers/customerReducer";
import { fetchWarehouses } from "../../../redux/reducers/warehouseReducer";
import { useDispatch, useSelector } from "react-redux";

// Fungsi untuk masking nomor HP
const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length < 8) return phoneNumber;
  const start = phoneNumber.slice(0, 3);
  const end = phoneNumber.slice(-3);
  return `${start}****${end}`;
};

const ShippingDetails = ({ selectedDestination }) => {
  const dispatch = useDispatch();

  // Data pelanggan dari Redux
  const customers = useSelector((state) => state.customers.list);
  const customer = customers.find((c) => c.id === selectedDestination.id);

  // Data gudang dari Redux
  const warehouses = useSelector((state) => state.warehouses.locations);
  const warehouse = warehouses.find((w) => w.id === selectedDestination.id);

  // Debugging: Log data dari Redux dan selectedDestination
  useEffect(() => {
    console.log("=== Debugging ShippingDetails ===");
    console.log("Selected Destination:", selectedDestination);
    console.log("Customer List from Redux:", customers);
    console.log("Warehouse List from Redux:", warehouses);
    if (selectedDestination.type === "pelanggan") {
      console.log("Matched Customer:", customer);
    } else if (selectedDestination.type === "gudang") {
      console.log("Matched Warehouse:", warehouse);
    }
    console.log("===============================");
  }, [selectedDestination, customers, customer, warehouses, warehouse]);

  // Fetch data pelanggan dan gudang jika belum ada
  useEffect(() => {
    if (!customers.length) {
      dispatch(fetchCustomers());
    }
    if (!warehouses.length) {
      dispatch(fetchWarehouses());
    }
  }, [dispatch, customers, warehouses]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Details
      </Typography>
      <Grid container spacing={2}>
        {/* Label Kiri */}
        <Grid size={6}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {selectedDestination.type === "gudang"
              ? "Nama Gudang"
              : "Nama Pelanggan"}
          </Typography>
          {selectedDestination.type === "pelanggan" && (
            <>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Alamat
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Nomor HP
              </Typography>
            </>
          )}
        </Grid>

        {/* Value Kanan */}
        <Grid size={6}>
          <Typography variant="body2">
            :{" "}
            {selectedDestination.type === "gudang"
              ? warehouse?.lokasi || "-"
              : customer?.nama_pelanggan || "-"}
          </Typography>
          {selectedDestination.type === "pelanggan" && (
            <>
              <Typography variant="body2">
                {customer?.alamat_pelanggan || "-"}
              </Typography>
              <Typography variant="body2">
                {maskPhoneNumber(customer?.nomor_hp) || "-"}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShippingDetails;
