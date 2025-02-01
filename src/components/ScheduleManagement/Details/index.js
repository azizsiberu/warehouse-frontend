// path: src/components/ScheduleManagement/Details/index.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchScheduleById,
  fetchFinalStockByScheduleId,
} from "../../../redux/reducers/scheduleReducer";
import ScheduleDetailHeader from "./ScheduleDetailHeader";
import ProductList from "./ProductList";
import { Box, CircularProgress, Typography } from "@mui/material";

const ScheduleDetailIndex = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Ambil schedule dan finalStock dari Redux
  const schedule = useSelector((state) => state.schedules.currentSchedule);
  const finalStock = useSelector((state) => state.schedules.finalStock);
  const loading = useSelector((state) => state.schedules.loading);
  const error = useSelector((state) => state.schedules.error);

  // Fetch schedule jika belum ada di Redux
  useEffect(() => {
    if (!schedule || schedule.transaction_id !== parseInt(id, 10)) {
      dispatch(fetchScheduleById(id)); // Memanggil Redux action untuk mengambil schedule berdasarkan ID
    }
  }, [dispatch, id, schedule]);

  // Mengambil data stok produk setelah data jadwal berhasil diambil
  useEffect(() => {
    if (schedule) {
      schedule.product_details.forEach((product) => {
        const productId = parseInt(product.product_id, 10);

        if (isNaN(productId)) {
          console.error("Invalid product ID:", product.product_id);
          return;
        }

        const existingStock = finalStock.find(
          (stock) => stock.id_produk === productId
        );

        if (!existingStock && !loading) {
          // Pastikan tidak ada data dan tidak dalam keadaan loading
          console.log("Fetching stock for product ID:", productId);
          dispatch(fetchFinalStockByScheduleId(productId)); // Fetch hanya jika data belum ada
        } else {
          console.log("Stock already fetched for product ID:", productId);
        }
      });
    }
  }, [dispatch, schedule, finalStock, loading]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!schedule) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">Jadwal tidak ditemukan.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <ScheduleDetailHeader schedule={schedule} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Produk yang Dipesan
        </Typography>
      </Box>
      <ProductList scheduleDetails={schedule} finalStock={finalStock} />
    </Box>
  );
};

export default ScheduleDetailIndex;
