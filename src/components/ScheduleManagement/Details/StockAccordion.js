// path: src/components/ScheduleManagement/Details/StockAccordion.js
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import { MdArrowDropDownCircle } from "react-icons/md";

const StockAccordion = ({ productId, finalStock }) => {
  // Filter untuk stok produk yang sesuai dengan ID produk
  const productStock = finalStock.filter(
    (stock) => stock.id_produk === productId
  );

  return (
    <>
      {productStock.length > 0 ? (
        // Map untuk merender setiap stok yang ditemukan
        productStock.map((stock, index) => (
          <Accordion key={index} sx={{ marginTop: 2 }}>
            <AccordionSummary expandIcon={<MdArrowDropDownCircle />}>
              <Typography variant="h6">
                {/* Menampilkan warna, finishing, gudang, dan stok untuk setiap stok produk */}
                {`${stock.final_warna} - ${stock.final_finishing} - ${stock.final_gudang} - ${stock.stok_tersedia} unit`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ padding: 1, borderBottom: "1px solid #ddd" }}>
                <Typography variant="body1">
                  <strong>Warna:</strong>{" "}
                  {stock.final_warna || "Tidak ada data"}
                </Typography>
                <Typography variant="body1">
                  <strong>Finishing:</strong>{" "}
                  {stock.final_finishing || "Tidak ada data"}
                </Typography>
                <Typography variant="body1">
                  <strong>Stok Tersedia:</strong> {stock.stok_tersedia} unit
                </Typography>
                <Typography variant="body1">
                  <strong>Lokasi:</strong>{" "}
                  {stock.warehouse_lokasi || "Tidak diketahui"}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        // Jika tidak ada stok untuk produk
        <Typography variant="body1" color="error">
          Tidak ada stok tersedia untuk produk ini.
        </Typography>
      )}
    </>
  );
};

export default StockAccordion;
