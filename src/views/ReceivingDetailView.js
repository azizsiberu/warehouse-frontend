// path: /src/views/ReceivingDetailView.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReceivingDetail from "../components/Receiving/ReceivingDetail/ReceivingDetail";

const ReceivingDetailView = ({ setPageTitle }) => {
  const location = useLocation();
  const { selectedProducts, selectedLocation } = location.state || {};

  useEffect(() => {
    const title = "Detail Stok Masuk";
    setPageTitle(title);
    document.title = title;

    // Tambahkan console.log untuk memeriksa data yang diterima
    console.log("Selected Products:", selectedProducts);
    console.log("Selected Location:", selectedLocation);
  }, [setPageTitle]);

  return (
    <ReceivingDetail
      selectedProducts={selectedProducts}
      selectedLocation={selectedLocation}
    />
  );
};

export default ReceivingDetailView;
