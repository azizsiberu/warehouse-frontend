// path : src/components/ScheduleManagement/Details/ProductDetailPopup.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

const ProductDetailPopup = ({ open, product, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detail Produk</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{product.product_name}</Typography>
        <Typography>Dimensi: {product.dimensi} cm</Typography>
        <Typography>Stok Tersedia: {product.stock}</Typography>
        <Typography>{product.description}</Typography>
        {/* Spesifikasi dan varian produk lainnya */}
        <Button onClick={onClose} color="primary" variant="contained">
          Tutup
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailPopup;
