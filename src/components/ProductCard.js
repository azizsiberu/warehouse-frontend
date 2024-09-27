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
        image={product.product_image}
        alt={product.name}
        onClick={onClick} // Navigasi atau fungsi lain di-handle dari parent
        sx={{ cursor: "pointer" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.Category?.category || "Kategori tidak tersedia"} |{" "}
          {product.SubCategory?.subkategori || "Subkategori tidak tersedia"}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontFamily: "Open Sans" }}
          >
            Rp{" "}
            {product.selling_price
              ? Number(product.selling_price).toLocaleString("id-ID")
              : "Harga tidak tersedia"}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Vendor: {product.Vendor?.vendor_name || "Vendor tidak tersedia"}
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
