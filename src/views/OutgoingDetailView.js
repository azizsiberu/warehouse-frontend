// path: /src/views/OutgoingDetailView.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OutgoingDetail from "../components/Outgoing/OutgoingDetail/OutgoingDetail";

const OutgoingDetailView = ({ setPageTitle }) => {
  const location = useLocation();
  const { selectedProducts } = location.state || {}; // Ambil hanya selectedProducts

  useEffect(() => {
    const title = "Detail Pengiriman Keluar";
    setPageTitle(title);
    document.title = title;

    // Tambahkan console.log untuk memeriksa data yang diterima
    console.log("Data yang diterima di OutgoingDetailView:");
    console.log("Selected Products:", selectedProducts);

    if (!selectedProducts) {
      console.warn(
        "Data produk tidak diterima di OutgoingDetailView. Harap periksa pengiriman data dari komponen sebelumnya."
      );
    }
  }, [setPageTitle, selectedProducts]);

  return <OutgoingDetail selectedProducts={selectedProducts} />;
};

export default OutgoingDetailView;
