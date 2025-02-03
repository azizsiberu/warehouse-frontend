// path: src/views/ScheduleConfirmationView.js
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ScheduleConfirmation from "../components/ScheduleManagement/Confirmation";

const ScheduleConfirmationView = ({ setPageTitle }) => {
  const location = useLocation();
  const schedule = useSelector((state) => state.schedules.currentSchedule);
  const selectedStocks = useSelector((state) => state.schedules.selectedStock);
  const { tanggal_pengiriman, selectedStock } = location.state || {};

  React.useEffect(() => {
    setPageTitle("Konfirmasi Jadwal");
    document.title = "Konfirmasi Jadwal Pengiriman";
  }, [setPageTitle]);

  const handleCancel = () => {
    console.log("❌ Membatalkan konfirmasi dan kembali ke halaman sebelumnya");
    window.history.back();
  };

  const handleConfirm = () => {
    console.log("✅ Mengonfirmasi jadwal pengiriman dengan data:", {
      schedule,
      tanggal_pengiriman,
      selectedStock,
    });
    // TODO: Tambahkan logic untuk menyimpan data ke backend
  };

  return (
    <ScheduleConfirmation
      schedule={{ ...schedule, tanggal_pengiriman }}
      selectedStocks={selectedStock}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default ScheduleConfirmationView;
