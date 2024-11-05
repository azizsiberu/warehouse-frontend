// path: /src/components/Receiving/Label/IncomingStockLabel.js
import React, { useRef } from "react";
import { Box, Typography, Chip, Divider, Button } from "@mui/material";
import SelectedProductList from "./SelectedProductList";

const IncomingLabel = ({ selectedProducts, selectedLocation }) => {
  const printRef = useRef(); // Reference untuk bagian yang akan dicetak

  const handlePrint = () => {
    const printContent = printRef.current; // Referensi ke elemen yang ingin dicetak
    const originalContent = document.body.innerHTML; // Simpan konten asli dari halaman

    // Mengganti body HTML dengan hanya konten yang ingin dicetak
    document.body.innerHTML = printContent.innerHTML;

    window.print(); // Memulai proses print

    // Mengembalikan konten asli setelah proses print selesai
    document.body.innerHTML = originalContent;

    // Reload halaman agar skrip dan state kembali seperti semula
    window.location.reload();
  };

  return (
    <Box>
      {/* Menampilkan daftar produk yang dipilih */}
      <Box ref={printRef} id="printableArea">
        <SelectedProductList
          selectedProducts={selectedProducts}
          showImage={false}
        />
      </Box>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
      </Box>
    </Box>
  );
};

export default IncomingLabel;
