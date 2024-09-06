// path: /src/components/ProductManagement/ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const productNameSlug = product.name.replace(/\s+/g, "-").toLowerCase();
    if (product.id_product) {
      navigate(`/product/${product.id_product}/${productNameSlug}`, {
        state: { id_product: product.id_product },
      });
    } else {
      console.error("id_product is undefined for product:", product);
    }
  };

  return (
    <Card
      onClick={handleCardClick} // Menambahkan navigasi saat diklik
      sx={{
        boxShadow: 2,
        maxWidth: 345,
      }}
    >
      {/* Foto Produk */}
      <CardMedia
        component="img"
        height="200"
        image={product.product_image}
        alt={product.name}
      />

      {/* Informasi Produk */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Nama Produk */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            whiteSpace: "nowrap", // Jangan membungkus teks menjadi dua baris
            overflow: "hidden", // Sembunyikan teks yang melampaui batas
            textOverflow: "ellipsis", // Tampilkan ellipsis jika teks terlalu panjang
            width: "100%", // Tentukan lebar agar overflow dapat diatur
          }}
        >
          {product.name}
        </Typography>

        {/* Kategori | Subkategori */}
        <Typography variant="body2" color="text.secondary">
          {product.Category?.category || "Kategori tidak tersedia"} |{" "}
          {product.SubCategory?.subkategori || "Subkategori tidak tersedia"}
        </Typography>

        {/* Harga Jual */}
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ fontFamily: "Open Sans" }}
          >
            {/* Cek apakah product.selling_price ada sebelum memanggil toLocaleString */}
            Rp{" "}
            {product.selling_price
              ? Number(product.selling_price).toLocaleString("id-ID") // Konversi ke number jika diperlukan
              : "Harga tidak tersedia"}
          </Typography>
        </Box>

        {/* Nama Vendor */}
        <Typography variant="body2" color="text.secondary">
          Vendor: {product.Vendor?.vendor_name || "Vendor tidak tersedia"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
