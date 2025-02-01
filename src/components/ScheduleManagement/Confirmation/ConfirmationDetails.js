// path: src/components/ScheduleManagement/Confirmation/ConfirmationDetails.js
import React from "react";
import { Box, Typography } from "@mui/material";

const ConfirmationDetails = ({ selectedStocks }) => {
  return (
    <Box sx={{ marginBottom: 2, padding: 2, borderBottom: "1px solid #ddd" }}>
      <Typography variant="h6" fontWeight="bold">
        Detail Produk
      </Typography>
      {selectedStocks.length > 0 ? (
        selectedStocks.map((stock, index) => (
          <Box key={index} sx={{ padding: 1, borderBottom: "1px solid #eee" }}>
            <Typography>
              {stock.produk_nama} x {stock.jumlah}
            </Typography>
            <Typography>Warna: {stock.final_warna}</Typography>
            <Typography>Finishing: {stock.final_finishing}</Typography>
            <Typography>Gudang: {stock.final_gudang}</Typography>
          </Box>
        ))
      ) : (
        <Typography>Tidak ada produk yang dipilih.</Typography>
      )}
    </Box>
  );
};

export default ConfirmationDetails;
