// path: /src/views/IncomingLabelView.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import IncomingLabel from "../components/Receiving/Label/IncomingLabel"; // Mengimpor komponen IncomingLabel

const IncomingLabelView = ({ setPageTitle }) => {
  const location = useLocation();
  const { selectedProducts, selectedLocation } = location.state || {};

  useEffect(() => {
    const title = "Cetak Label Stok Masuk";
    setPageTitle(title);
    document.title = title;

    console.log("Selected Products for Label Print:", selectedProducts);
    console.log("Selected Location for Label Print:", selectedLocation);
  }, [setPageTitle, selectedProducts, selectedLocation]);

  return (
    <IncomingLabel
      selectedProducts={selectedProducts}
      selectedLocation={selectedLocation}
    />
  );
};

export default IncomingLabelView;
