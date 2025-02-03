// path: src/components/ScheduleManagement/Details/StockAccordion.js
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedStock,
  removeSelectedStock,
} from "../../../redux/reducers/scheduleReducer";

// Fungsi untuk menampilkan spesifikasi produk di dalam accordion
const renderSpesification = (stock) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Spesifikasi</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography>Dimensi</Typography>
          {(stock.final_kain || stock.sofa_kain) && (
            <Typography>Kain</Typography>
          )}
          {(stock.final_kaki || stock.sofa_kaki) && (
            <Typography>Kaki</Typography>
          )}
          {(stock.final_dudukan || stock.sofa_dudukan) && (
            <Typography>Dudukan</Typography>
          )}
          {(stock.final_bantal_peluk !== null ||
            stock.sofa_bantal_peluk !== null) && (
            <Typography>Bantal Peluk</Typography>
          )}
          {(stock.final_bantal_sandaran !== null ||
            stock.sofa_bantal_sandaran !== null) && (
            <Typography>Bantal Sandaran</Typography>
          )}
          {(stock.final_kantong_remot !== null ||
            stock.sofa_kantong_remot !== null) && (
            <Typography>Kantong Remot</Typography>
          )}
          {stock.sofa_puff && <Typography>Puff</Typography>}
        </Box>
        <Box>
          <Typography>
            : {stock.panjang || stock.sofa_panjang} x{" "}
            {stock.lebar || stock.sofa_lebar} x{" "}
            {stock.tinggi || stock.sofa_tinggi} cm
          </Typography>
          {(stock.final_kain || stock.sofa_kain) && (
            <Typography>: {stock.final_kain || stock.sofa_kain}</Typography>
          )}
          {(stock.final_kaki || stock.sofa_kaki) && (
            <Typography>: {stock.final_kaki || stock.sofa_kaki}</Typography>
          )}
          {(stock.final_dudukan || stock.sofa_dudukan) && (
            <Typography>
              : {stock.final_dudukan || stock.sofa_dudukan}
            </Typography>
          )}
          {(stock.final_bantal_peluk !== null ||
            stock.sofa_bantal_peluk !== null) && (
            <Typography>
              : {stock.final_bantal_peluk ?? stock.sofa_bantal_peluk}
            </Typography>
          )}
          {(stock.final_bantal_sandaran !== null ||
            stock.sofa_bantal_sandaran !== null) && (
            <Typography>
              : {stock.final_bantal_sandaran ?? stock.sofa_bantal_sandaran}
            </Typography>
          )}
          {(stock.final_kantong_remot !== null ||
            stock.sofa_kantong_remot !== null) && (
            <Typography>
              : {stock.final_kantong_remot ?? stock.sofa_kantong_remot}
            </Typography>
          )}
          {stock.sofa_puff && (
            <Typography>: {stock.sofa_puff ? "Ya" : "Tidak"}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Fungsi untuk menampilkan varian produk di dalam accordion
const renderVariants = (stock) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6">Varian</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {stock.final_warna && <Typography>Warna</Typography>}
          {stock.final_finishing && <Typography>Finishing</Typography>}
        </Box>
        <Box>
          {stock.final_warna && <Typography>: {stock.final_warna}</Typography>}
          {stock.final_finishing && (
            <Typography>: {stock.final_finishing}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const StockAccordion = ({
  productId,
  finalStock,
  orderedQuantity,
  onSelectStock,
}) => {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.schedules.selectedStock);
  const [selectedStockId, setSelectedStockId] = useState(null);

  const productStock = finalStock.filter(
    (stock) => stock.final_id_produk === productId
  );

  const handleSelectStock = (stock) => {
    const alreadySelected = selectedStock.find(
      (item) => item.final_id === stock.final_id
    );

    if (alreadySelected) {
      // Jika stok sudah dipilih, hapus dari Redux
      dispatch(removeSelectedStock(stock.final_id));
      console.log("Unselected stock:", stock);
    } else {
      // Menyertakan jumlah produk yang dipesan
      const selectedData = {
        ...stock,
        jumlah: orderedQuantity, // Sesuaikan dengan jumlah yang dipesan
      };

      dispatch(addSelectedStock(selectedData));
      console.log("Selected stock:", selectedData);
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {productStock.length > 0 ? (
        productStock.map((stock) => (
          <Accordion key={stock.final_id} sx={{ marginBottom: 1 }}>
            <AccordionSummary expandIcon={<MdArrowDropDownCircle />}>
              <Typography variant="h6">
                {stock.final_warna} - {stock.final_finishing} -{" "}
                {stock.final_gudang} - {stock.final_stok_tersedia} unit
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ padding: 1, borderBottom: "1px solid #ddd" }}>
                <Typography variant="h5">{stock.produk_nama}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body1">Stok Tersedia</Typography>
                    <Typography variant="body1">Lokasi</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">
                      <strong>: {stock.final_stok_tersedia}</strong> unit
                    </Typography>
                    <Typography variant="body1">
                      <strong>
                        : {stock.final_gudang || "Tidak diketahui"}
                      </strong>
                    </Typography>
                  </Box>
                </Box>

                {renderSpesification(stock)}
                {renderVariants(stock)}
                {/* 🔹 Custom Detail (Jika Produk Custom) */}
                {stock.final_is_custom && (
                  <Box sx={{ border: "1px solid #ddd", padding: 2, mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      🔹 Custom Detail
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ width: 120 }}>
                        {stock.final_ukuran && <Typography>Ukuran</Typography>}
                        {stock.final_kain && <Typography>Kain</Typography>}
                        {stock.final_kaki && <Typography>Kaki</Typography>}
                        {stock.final_dudukan && (
                          <Typography>Dudukan</Typography>
                        )}
                        {stock.final_bantal_peluk !== null && (
                          <Typography>Bantal Peluk</Typography>
                        )}
                        {stock.final_bantal_sandaran !== null && (
                          <Typography>Bantal Sandaran</Typography>
                        )}
                      </Box>
                      <Box>
                        {stock.final_ukuran && (
                          <Typography>: {stock.final_ukuran}</Typography>
                        )}
                        {stock.final_kain && (
                          <Typography>: {stock.final_kain}</Typography>
                        )}
                        {stock.final_kaki && (
                          <Typography>: {stock.final_kaki}</Typography>
                        )}
                        {stock.final_dudukan && (
                          <Typography>: {stock.final_dudukan}</Typography>
                        )}
                        {stock.final_bantal_peluk !== null && (
                          <Typography>: {stock.final_bantal_peluk}</Typography>
                        )}
                        {stock.final_bantal_sandaran !== null && (
                          <Typography>
                            : {stock.final_bantal_sandaran}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Tombol Pilih/Batal Pilih Stok */}
                <Button
                  variant={
                    selectedStock.some(
                      (item) => item.final_id === stock.final_id
                    )
                      ? "outlined"
                      : "contained"
                  }
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => {
                    console.log(
                      "Clicked stock selection button for:",
                      stock.final_id
                    );
                    handleSelectStock(stock);
                  }}
                >
                  {selectedStock.some(
                    (item) => item.final_id === stock.final_id
                  )
                    ? "Batal Pilih"
                    : "Pilih Stok"}
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body1" color="error">
          Tidak ada stok tersedia untuk produk ini.
        </Typography>
      )}
    </Box>
  );
};

export default StockAccordion;
