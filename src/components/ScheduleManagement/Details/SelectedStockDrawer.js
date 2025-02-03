import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs"; // Untuk format tanggal
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { removeSelectedStock } from "../../../redux/reducers/scheduleReducer";

const SelectedStockDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedStock = useSelector((state) => state.schedules.selectedStock);
  const schedule = useSelector((state) => state.schedules.currentSchedule);
  console.log("📌 Redux currentSchedule:", schedule);

  // State untuk tanggal pengiriman
  const [deliveryDate, setDeliveryDate] = React.useState(
    dayjs().add(1, "day").format("YYYY-MM-DD") // Default: Besok
  );

  // Fungsi untuk mengubah tanggal
  const handleDateChange = (event) => {
    setDeliveryDate(event.target.value);
    console.log("Tanggal pengiriman dipilih:", event.target.value);
  };

  const handleConfirmSchedule = () => {
    if (!schedule) {
      console.error("⚠️ Data jadwal tidak ditemukan! Periksa Redux state.");
      console.log("📌 Redux currentSchedule:", schedule); // Debugging
      return;
    }

    console.log("🚀 Navigasi ke halaman konfirmasi dengan data:", {
      schedule, // ✅ Kirim seluruh Redux `currentSchedule`
      tanggal_pengiriman: deliveryDate,
      selectedStock,
    });

    navigate("/schedule-confirmation", {
      state: {
        schedule, // ✅ Kirim seluruh Redux `currentSchedule`
        tanggal_pengiriman: deliveryDate,
        selectedStock,
      },
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Drawer */}
        <Box sx={{ padding: 2, borderBottom: "1px solid #ddd" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Stok Terpilih
            </Typography>
            <IconButton onClick={onClose}>
              <MdClose size={24} />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        {/* Produk List yang bisa di-scroll */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
          {selectedStock.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
              Tidak ada stok yang dipilih.
            </Typography>
          ) : (
            selectedStock.map((stock, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  padding: 1,
                  borderBottom: "1px solid #ddd",
                }}
              >
                {/* Gambar Produk */}
                <Box
                  component="img"
                  src={stock.foto_produk}
                  alt={stock.produk_nama}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    objectFit: "cover",
                    aspectRatio: "1/1",
                  }}
                />

                {/* Detail Produk */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {stock.produk_nama} x {stock.jumlah}
                  </Typography>
                  {stock.final_warna && (
                    <Typography variant="body2">
                      Warna: {stock.final_warna}
                    </Typography>
                  )}
                  {stock.final_finishing && (
                    <Typography variant="body2">
                      Finishing: {stock.final_finishing}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    Gudang: {stock.final_gudang}
                  </Typography>
                </Box>

                {/* Tombol Hapus */}
                <IconButton
                  onClick={() => dispatch(removeSelectedStock(stock.final_id))}
                >
                  <MdClose size={20} color="red" />
                </IconButton>
              </Box>
            ))
          )}
        </Box>

        {/* 📅 Pick Date + Agendakan Pengiriman */}
        {selectedStock.length > 0 && (
          <Box sx={{ mt: "auto", p: 2 }}>
            <TextField
              label="Tanggal Pengiriman"
              type="date"
              size="small"
              fullWidth
              value={deliveryDate}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: "10px", fontSize: "16px", fontWeight: "bold" }}
              onClick={handleConfirmSchedule}
            >
              Agendakan Pengiriman
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default SelectedStockDrawer;
