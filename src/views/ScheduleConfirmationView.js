// path: src/views/ScheduleConfirmationView.js
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScheduleConfirmation from "../components/ScheduleManagement/Confirmation";
import { finalizeScheduleThunk } from "../redux/reducers/scheduleReducer";

const ScheduleConfirmationView = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = useSelector((state) => state.auth.userId);
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
    console.log("📤 Mengirim data final schedule:", {
      schedule,
      selectedStock,
    });

    if (!schedule || !selectedStock.length) {
      console.error("❌ Data tidak lengkap! Pastikan produk dipilih.");
      return;
    }

    const payload = {
      id_transaksi: schedule.transaction_id,
      id_customer: schedule.id,
      tanggal_pengiriman: tanggal_pengiriman,
      id_user_creator: userId,
      id_user_sales: schedule.sales_id,
      products: selectedStock.map((stock) => {
        const matchingProduct = schedule.product_details.find(
          (product) => product.product_id === stock.final_id_produk
        );

        return {
          id_final_stock: stock.final_id,
          jumlah: stock.jumlah,
          id_transaksi_detail: matchingProduct
            ? matchingProduct.transaction_detail_id
            : null,
        };
      }),
    };

    console.log(
      "📤 Payload yang dikirim ke backend:",
      JSON.stringify(payload, null, 2)
    );

    dispatch(finalizeScheduleThunk(payload)).then((response) => {
      if (response.error) {
        console.error("❌ Gagal menyimpan jadwal:", response.error);
        alert("❌ Gagal menyimpan jadwal pengiriman. Coba lagi.");
      } else {
        console.log("✅ Jadwal berhasil disimpan!", response.payload);

        // 🔥 Tampilkan Popup Sukses
        alert("✅ Jadwal pengiriman telah dikonfirmasi!");

        // 🚀 Navigasi ke Home
        window.location.href = "/";

        // 🔄 Reset semua state kecuali token
        dispatch({ type: "RESET_APP_STATE" });
      }
    });
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
