// path: src/views/OutgoingLabelView.js

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OutgoingLabel from "../components/Outgoing/OutgoingLabel/OutgoingLabel";

const OutgoingLabelView = ({ setPageTitle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts, selectedDestination } = location.state || {};

  useEffect(() => {
    const title = "Label Pengiriman";
    setPageTitle(title);
    document.title = title;

    // Jika data tidak tersedia, redirect ke halaman sebelumnya
    if (!selectedProducts || !selectedDestination) {
      alert("Data pengiriman tidak lengkap. Mengarahkan kembali...");
      navigate(-1);
    }
  }, [setPageTitle, selectedProducts, selectedDestination, navigate]);

  useEffect(() => {
    console.log("Data di OutgoingLabelView:");
    console.log("Selected Products:", selectedProducts);
    console.log("Selected Destination:", selectedDestination);
  }, [selectedProducts, selectedDestination]);

  return (
    <OutgoingLabel
      selectedProducts={selectedProducts}
      selectedDestination={selectedDestination}
      deliveryData={location.state?.deliveryData}
    />
  );
};

export default OutgoingLabelView;
