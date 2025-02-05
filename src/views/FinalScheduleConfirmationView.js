import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FinalScheduleConfirmation from "../components/ScheduleManagement/FinalConfirmation";
import { id } from "date-fns/locale";
import { submitOutgoingStockWithReservedReduction } from "../redux/reducers/outgoingStockReducer";

const FinalScheduleConfirmationView = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schedule = useSelector((state) => state.schedules.currentFinalSchedule);
  const selectedStocks =
    useSelector((state) => state.schedules.selectedStockFinal) || [];

  // State untuk menyimpan data delivery yang diterima dari komponen presentasional
  const [deliveryData, setDeliveryData] = useState(null);

  useEffect(() => {
    if (!schedule) {
      navigate("/");
    }
    setPageTitle("Konfirmasi Pengiriman");
  }, [schedule, setPageTitle, navigate]);

  const handleConfirm = () => {
    if (!schedule || selectedStocks.length === 0 || !deliveryData) {
      alert(
        "Data tidak lengkap. Pastikan jadwal, produk, dan data pengiriman sudah terisi."
      );
      return;
    }

    // Susun data yang akan dikirim ke OutgoingLabel
    const commonData = {
      id_schedule: schedule.schedule_id,
      id_customer: schedule.id,
      tanggal_pengiriman: schedule.tanggal_pengiriman,
      id_transaksi: schedule.transaction_id,
      id_user_sales: schedule.id_users,
    };

    if (deliveryData.type === "kurirSendiri") {
      commonData.driver = deliveryData.data.driver;
      commonData.partners = deliveryData.data.partners;
      commonData.vehicle = deliveryData.data.vehicle;
    } else if (deliveryData.type === "ekspedisiRekanan") {
      commonData.id_ekspedisi = deliveryData.data.id || null;
    }

    const payload = selectedStocks.map((stock) => ({
      ...commonData,
      id_final_stock: stock.final_stock.final_stock_id, // ID final stock
      jumlah: stock.schedule_details.jumlah, // Jumlah produk
    }));

    // Log semua data yang akan dikirim
    console.log("📌 [CHECK DATA] Data yang akan dikirim:");
    console.log("✅ Common Data:", commonData);
    console.log("✅ Selected Stocks:", selectedStocks);
    console.log("✅ Delivery Data:", deliveryData);
    console.log("✅ Final Payload:", payload);

    console.log("📡 [CHECK DATA] Data yang akan dikirim ke backend:", payload);

    // **Mengirim data ke backend menggunakan Redux Thunk**
    dispatch(submitOutgoingStockWithReservedReduction(payload))
      .then((response) => {
        if (response.error) {
          console.error("❌ Gagal mengirim data:", response.error);
          alert("Gagal mengonfirmasi pengiriman. Silakan coba lagi.");
        } else {
          console.log("✅ Data berhasil dikirim ke backend:", response.payload);
          alert("Jadwal pengiriman telah dikonfirmasi!");

          // Navigasi ke halaman OutgoingLabel setelah berhasil
          navigate("/outgoing-label", {
            state: {
              selectedProducts: selectedStocks.map((stock) => ({
                product: {
                  id: stock.final_stock.final_stock_id,
                  nama: stock.product_name,
                },
                variants: [
                  {
                    ukuran: stock.final_stock?.ukuran || stock.dimensi,
                    final_warna: stock.final_stock?.warna,
                    final_finishing: stock.final_stock?.finishing,
                    final_kain: stock.final_stock?.kain,
                    final_kaki: stock.final_stock?.jenis_kaki,
                    final_dudukan: stock.final_stock?.jenis_dudukan,
                    final_bantal_peluk: stock.sofa_details?.bantal_peluk,
                    final_bantal_sandaran: stock.sofa_details?.bantal_sandaran,
                    jumlah: stock.schedule_details?.jumlah,
                  },
                ],
              })),
              selectedDestination: {
                id: schedule.id,
                type: "pelanggan",
                nama_pelanggan: schedule.nama_pelanggan,
                alamat_pelanggan: schedule.alamat_pelanggan,
                nomor_hp: schedule.nomor_hp,
              },
              deliveryData,
            },
          });
        }
      })
      .catch((error) => {
        console.error("❌ Error:", error);
        alert("Terjadi kesalahan saat mengirim data.");
      });
  };

  return (
    <FinalScheduleConfirmation
      schedule={schedule}
      selectedStocks={selectedStocks}
      onConfirm={handleConfirm}
      // Callback untuk menerima data delivery dari komponen presentasional
      onDeliveryData={setDeliveryData}
    />
  );
};

export default FinalScheduleConfirmationView;
