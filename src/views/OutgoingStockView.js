// path: /src/views/OutgoingStockView.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import OutgoingList from "../components/Outgoing/OutgoingList";

const OutgoingStockView = ({ setPageTitle }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]); // Menyimpan produk yang dipilih untuk stok keluar

  useEffect(() => {
    const title = "Pengelolaan Stok Keluar";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  // Fungsi untuk menangani perubahan pada pilihan gudang
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSelectedProducts([]); // Reset produk yang dipilih ketika gudang diubah
  };

  // Fungsi untuk menangani penambahan produk ke dalam stok keluar
  const handleAddProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  return (
    <Box>
      <OutgoingList
        selectedLocation={selectedLocation}
        onAddProduct={handleAddProduct}
        onLocationChange={handleLocationChange}
      />
    </Box>
  );
};

export default OutgoingStockView;
