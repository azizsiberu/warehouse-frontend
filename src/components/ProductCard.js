// path: /src/components/ProductCard.js
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

const ProductCard = ({ product, buttonLabel, onClick }) => {
  return (
    <Card
      sx={{
        boxShadow: 2,
        maxWidth: 345,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.foto_produk}
        alt={product.nama}
        onClick={onClick} // Navigasi atau fungsi lain di-handle dari parent
        sx={{ cursor: "pointer" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {product.kategori || "Kategori tidak tersedia"} |{" "}
          {product.subkategori || "Subkategori tidak tersedia"}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {product.nama}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Vendor: {product.vendor || "Vendor tidak tersedia"}
        </Typography>

        {/* Tambahkan tombol khusus di sini */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onClick} // Fungsi atau navigasi di-handle dari parent
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
