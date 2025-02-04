// path: src/views/FinalScheduleConfirmationView.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FinalScheduleConfirmation from "../components/ScheduleManagement/FinalConfirmation";
import {
  finalizeScheduleThunk,
  resetCurrentFinalSchedule,
} from "../redux/reducers/scheduleReducer";

const FinalScheduleConfirmationView = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schedule = useSelector((state) => state.schedules.currentFinalSchedule);
  const selectedStocks =
    useSelector((state) => state.schedules.selectedStockFinal) || [];

  useEffect(() => {
    console.log("📌 [FinalScheduleConfirmationView] Jadwal Final:", schedule);
    console.log(
      "📌 [FinalScheduleConfirmationView] Produk Terpilih:",
      selectedStocks
    );

    if (!schedule) {
      console.warn(
        "⚠️ [FinalScheduleConfirmationView] Tidak ada data jadwal! Mengarahkan kembali ke homepage."
      );
      navigate("/");
    }

    setPageTitle("Konfirmasi Pengiriman");
  }, [setPageTitle, schedule, selectedStocks, navigate]);

  const handleCancel = () => {
    console.log("❌ [FinalScheduleConfirmationView] Konfirmasi dibatalkan");
    dispatch(resetCurrentFinalSchedule());
    navigate(-1);
  };

  const handleConfirm = () => {
    console.log(
      "✅ [FinalScheduleConfirmationView] Mengirim jadwal final:",
      schedule
    );
    console.log(
      "✅ [FinalScheduleConfirmationView] Produk yang dikirim:",
      selectedStocks
    );

    if (!schedule || selectedStocks.length === 0) {
      console.error("❌ [FinalScheduleConfirmationView] Data tidak lengkap!");
      alert("⚠️ Data tidak lengkap! Pastikan produk dipilih.");
      return;
    }

    const payload = {
      id_transaksi: schedule.transaction_id,
      id_customer: schedule.id,
      tanggal_pengiriman: schedule.tanggal_pengiriman,
      id_user_sales: schedule.sales_id,
      products: selectedStocks.map((stock) => ({
        id_final_stock: stock.final_id,
        jumlah: stock.jumlah,
      })),
    };

    dispatch(finalizeScheduleThunk(payload)).then((response) => {
      if (!response.error) {
        alert("✅ Jadwal pengiriman telah dikonfirmasi!");
        dispatch(resetCurrentFinalSchedule());
        navigate("/");
      }
    });
  };

  return (
    <FinalScheduleConfirmation
      schedule={schedule}
      selectedStocks={selectedStocks}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default FinalScheduleConfirmationView;
