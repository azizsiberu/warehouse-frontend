// path: /src/components/ProductManagement/ProductDetails.js
import React, { useEffect } from "react";
import { Box, Typography, Button, Chip, Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/reducers/productReducer";
import Loading from "../Loading";

const ProductDetails = ({ setPageTitle }) => {
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

  // Update the page title when product details are available
  useEffect(() => {
    if (productDetails && productDetails.name) {
      const title = `Detail Produk: ${productDetails.name}`;
      setPageTitle(title);
      document.title = title;
    }
  }, [productDetails, setPageTitle]);

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
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={productDetails.category} color="primary" />
            <Chip
              label={productDetails.subcategory}
              color="primary"
              variant="outlined"
            />
          </Stack>
          <Typography variant="h3">{productDetails.name}</Typography>
          <Typography variant="body1" gutterBottom>
            SKU: {productDetails.sku}
          </Typography>

          <img
            src={productDetails.vendorlogo}
            alt={productDetails.vendor}
            style={{ width: 100, height: "auto", marginBottom: 10 }}
          />

          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ fontFamily: "Open Sans" }}
          >
            Rp{" "}
            {productDetails.selling_price
              ? Number(productDetails.selling_price).toLocaleString("id-ID") // Konversi ke number jika diperlukan
              : "Harga tidak tersedia"}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="body1" gutterBottom>
              {productDetails.description}
            </Typography>
          </Box>
          <Typography variant="subtitle1">Spesifikasi Detail:</Typography>

          <Typography variant="subtitle1" gutterBottom>
            Dimensi: {productDetails.dimension} cm
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {/* Menampilkan spesifikasi detail produk kiri */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  {productDetails.style && (
                    <Typography variant="body1" gutterBottom>
                      Style
                    </Typography>
                  )}
                  {productDetails.fabric && (
                    <Typography variant="body1" gutterBottom>
                      Kain
                    </Typography>
                  )}
                  {productDetails.leg_type && (
                    <Typography variant="body1" gutterBottom>
                      Jenis Kaki
                    </Typography>
                  )}
                  {productDetails.seat_type && (
                    <Typography variant="body1" gutterBottom>
                      Jenis Dudukan
                    </Typography>
                  )}
                </Grid>
                <Grid size={6}>
                  {productDetails.style && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.style}
                    </Typography>
                  )}
                  {productDetails.fabric && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.fabric}
                    </Typography>
                  )}
                  {productDetails.seat_type && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.seat_type}
                    </Typography>
                  )}
                  {productDetails.leg_type && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.leg_type}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Menampilkan spesifikasi detail produk kanan */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  {productDetails.throw_pillows !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      Bantal Peluk
                    </Typography>
                  )}
                  {productDetails.back_cushions !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      Bantal Sandaran
                    </Typography>
                  )}
                  {productDetails.remote_pockets !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      Kantong Remote
                    </Typography>
                  )}
                  {productDetails.puff !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      Puff
                    </Typography>
                  )}
                </Grid>
                <Grid size={6}>
                  {productDetails.throw_pillows !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.throw_pillows}
                    </Typography>
                  )}
                  {productDetails.back_cushions !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.back_cushions}
                    </Typography>
                  )}
                  {productDetails.remote_pockets !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.remote_pockets}
                    </Typography>
                  )}
                  {productDetails.puff !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.puff ? "Ya" : "Tidak"}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

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
