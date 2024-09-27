// path: /src/views/ProductManagementView.js
import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductManagement/ProductList";
import ProductForm from "../components/ProductManagement/ProductForm";

const ProductManagementView = ({ setPageTitle }) => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(true);
  };

  useEffect(() => {
    const title = "Product Management";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      const updatedProducts = products.map((product) =>
        product.name === selectedProduct.name ? productData : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, productData]);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancelEdit}
        />
      ) : (
        <ProductList products={products} onAddProduct={handleAddProduct} />
      )}
    </div>
  );
};

export default ProductManagementView;
