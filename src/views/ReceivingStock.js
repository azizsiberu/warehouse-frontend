// path: /src/views/ReceivingManagementView.js
import React, { useState, useEffect } from "react";
import ReceivingList from "../components/Receiving/ReceivingList";
import StockForm from "../components/Receiving/StockForm"; // Form untuk menambah stok

const ReceivingManagementView = ({ setPageTitle }) => {
  const [products, setProducts] = useState([]);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddStock = (product) => {
    setSelectedProduct(product);
    setIsAddingStock(true);
  };

  useEffect(() => {
    const title = "Receiving Management";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  const handleSaveStock = (stockData) => {
    // Update stok produk dengan data baru
    const updatedProducts = products.map((product) =>
      product.name === selectedProduct.name
        ? { ...product, stock: stockData.stock }
        : product
    );
    setProducts(updatedProducts);
    setIsAddingStock(false);
  };

  const handleCancelAddStock = () => {
    setIsAddingStock(false);
  };

  return (
    <div>
      {isAddingStock ? (
        <StockForm
          product={selectedProduct}
          onSave={handleSaveStock}
          onCancel={handleCancelAddStock}
        />
      ) : (
        <ReceivingList products={products} onAddStock={handleAddStock} />
      )}
    </div>
  );
};

export default ReceivingManagementView;
