// path: src/views/ScheduleConfirmationView.js
import React from "react";
import { useSelector } from "react-redux";
import ScheduleConfirmation from "../components/ScheduleManagement/Confirmation";

const ScheduleConfirmationView = ({ setPageTitle }) => {
  const schedule = useSelector((state) => state.schedules.currentSchedule);
  const selectedStocks = useSelector((state) => state.schedules.selectedStock);

  React.useEffect(() => {
    setPageTitle("Konfirmasi Jadwal Pengiriman");
    document.title = "Konfirmasi Jadwal Pengiriman";
  }, [setPageTitle]);

  const handleCancel = () => {
    console.log("Membatalkan konfirmasi dan kembali ke halaman sebelumnya");
    window.history.back(); // Kembali ke halaman sebelumnya
  };

  const handleConfirm = () => {
    console.log("Mengonfirmasi jadwal pengiriman dengan data:", {
      schedule,
      selectedStocks,
    });
    // TODO: Tambahkan logic untuk menyimpan data ke backend
  };

  return (
    <ScheduleConfirmation
      schedule={schedule}
      selectedStocks={selectedStocks}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default ScheduleConfirmationView;
