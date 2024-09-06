// path: /src/components/ProductManagement/ProductDetails.js
import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/reducers/productReducer";
import Loading from "../Loading";

const ProductDetails = () => {
  const { id } = useParams(); // Mengambil id_produk dari URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id)); // Memanggil thunk untuk mendapatkan detail produk berdasarkan id_produk
  }, [dispatch, id]);

  const handleEditProduct = () => {
    navigate(`/product-management/edit/${id}`); // Mengarahkan ke halaman edit produk
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!productDetails) {
    return <Typography variant="h6">Produk tidak ditemukan</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4}>
        {/* Gambar Produk */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={productDetails.product_image}
            alt={productDetails.name}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 1,
            }}
          />
        </Grid>

        {/* Detail Produk */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
            {productDetails.category} | {productDetails.subcategory}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {productDetails.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            SKU: {productDetails.sku}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            sx={{ fontFamily: "Open Sans" }}
          >
            Rp{" "}
            {productDetails.selling_price
              ? Number(productDetails.selling_price).toLocaleString("id-ID") // Konversi ke number jika diperlukan
              : "Harga tidak tersedia"}
          </Typography>

          <Typography variant="body1" gutterBottom>
            Vendor: {productDetails.vendor}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            {productDetails.description}
          </Typography>
          {productDetails.leg_type && (
            <Typography variant="body1" gutterBottom>
              Leg Type: {productDetails.leg_type}
            </Typography>
          )}

          {productDetails.throw_pillows !== undefined && (
            <Typography variant="body1" gutterBottom>
              Throw Pillows: {productDetails.throw_pillows}
            </Typography>
          )}

          {productDetails.back_cushions !== undefined && (
            <Typography variant="body1" gutterBottom>
              Back Cushions: {productDetails.back_cushions}
            </Typography>
          )}

          {productDetails.remote_pockets !== undefined && (
            <Typography variant="body1" gutterBottom>
              Remote Pockets: {productDetails.remote_pockets}
            </Typography>
          )}

          {productDetails.puff !== undefined && (
            <Typography variant="body1" gutterBottom>
              Puff: {productDetails.puff ? "Yes" : "No"}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProduct}
            >
              Edit Produk
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
