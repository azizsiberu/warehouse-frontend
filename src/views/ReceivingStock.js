// path: /src/views/ReceivingManagementView.js
import React, { useState, useEffect } from "react";
import ReceivingList from "../components/Receiving/ReceivingList";
import StockForm from "../components/Receiving/StockForm"; // Form untuk menambah stok

const ReceivingManagementView = ({ setPageTitle }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const title = "Stok Masuk";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  return (
    <div>
      <ReceivingList products={products} />
    </div>
  );
};

export default ReceivingManagementView;
