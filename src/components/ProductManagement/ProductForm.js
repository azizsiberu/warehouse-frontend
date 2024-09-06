// path: /src/components/ProductManagement/ProductForm.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../redux/reducers/productReducer";

const ProductForm = ({ product, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: product ? product.id : Date.now(),
    name: product ? product.name : "",
    stock: product ? product.stock : "",
    price: product ? product.price : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (product) {
      dispatch(editProduct(formData));
    } else {
      dispatch(addProduct(formData));
    }
    onCancel();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {product ? "Edit Produk" : "Tambah Produk"}
      </Typography>
      <TextField
        label="Nama Produk"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stok"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Harga"
        name="price"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Simpan
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          sx={{ ml: 2 }}
        >
          Batal
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
