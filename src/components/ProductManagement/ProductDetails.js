// path: /src/components/ProductManagement/ProductDetails.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  createShippingDetails,
  fetchShippingDetailsByProductId,
  updateShippingDetailsByProductId,
} from "../../redux/reducers/productReducer";
import Loading from "../Loading";

const ProductDetails = ({ setPageTitle }) => {
  const { id } = useParams(); // Mengambil id_produk dari URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State untuk dialog dan keterangan tambahan
  const [openDialog, setOpenDialog] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({
    packing_panjang: "",
    packing_lebar: "",
    packing_tinggi: "",
    berat_barang: "",
    jumlah_coli: "",
  });

  const { productDetails, loading, error, shippingDetails } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchShippingDetailsByProductId(id));
  }, [dispatch, id]);

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

  const handleOpenDialog = () => {
    if (shippingDetails && shippingDetails.packing_panjang) {
      setAdditionalInfo({
        packing_panjang: shippingDetails.packing_panjang || "",
        packing_lebar: shippingDetails.packing_lebar || "",
        packing_tinggi: shippingDetails.packing_tinggi || "",
        berat_barang: shippingDetails.berat_barang || "",
        jumlah_coli: shippingDetails.jumlah_coli || "",
      });
    } else {
      // Reset jika tidak ada data shipping
      setAdditionalInfo({
        packing_panjang: "",
        packing_lebar: "",
        packing_tinggi: "",
        berat_barang: "",
        jumlah_coli: "",
      });
    }
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo({ ...additionalInfo, [name]: value });
  };

  const handleSaveShippingDetails = () => {
    if (shippingDetails && shippingDetails.packing_panjang) {
      // Jika data shipping sudah ada, panggil updateShippingDetailsByProductId
      dispatch(updateShippingDetailsByProductId(id, additionalInfo));
    } else {
      // Jika data shipping belum ada, panggil createShippingDetails
      dispatch(createShippingDetails({ id_produk: id, ...additionalInfo }));
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4}>
        {/* Gambar Produk */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={productDetails.foto_produk}
            alt={productDetails.nama}
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
            <Chip label={productDetails.kategori} color="primary" />
            <Chip
              label={productDetails.subkategori}
              color="primary"
              variant="outlined"
            />
          </Stack>
          <Typography variant="h3">{productDetails.nama}</Typography>
          <Typography variant="body1" gutterBottom>
            SKU: {productDetails.sku}
          </Typography>

          <img
            src={productDetails.logo_vendor}
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
            {productDetails.harga_jual
              ? Number(productDetails.harga_jual).toLocaleString("id-ID") // Konversi ke number jika diperlukan
              : "Harga tidak tersedia"}
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="body1" gutterBottom>
              {productDetails.deskripsi}
            </Typography>
          </Box>
          <Typography variant="subtitle1">Spesifikasi Detail:</Typography>

          <Typography variant="subtitle1" gutterBottom>
            Dimensi: {productDetails.panjang} x {productDetails.lebar} x{" "}
            {productDetails.tinggi} cm
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
                  {productDetails.kain && (
                    <Typography variant="body1" gutterBottom>
                      Kain
                    </Typography>
                  )}
                  {productDetails.kaki && (
                    <Typography variant="body1" gutterBottom>
                      Jenis Kaki
                    </Typography>
                  )}
                  {productDetails.dudukan && (
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
                  {productDetails.kain && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.kain}
                    </Typography>
                  )}
                  {productDetails.kaki && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.kaki}
                    </Typography>
                  )}
                  {productDetails.dudukan && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.dudukan}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Menampilkan spesifikasi detail produk kanan */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  {productDetails.bantal_peluk !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      Bantal Peluk
                    </Typography>
                  )}
                  {productDetails.bantal_sandaran !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      Bantal Sandaran
                    </Typography>
                  )}
                  {productDetails.kantong_remot !== undefined && (
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
                  {productDetails.bantal_peluk !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.bantal_peluk}
                    </Typography>
                  )}
                  {productDetails.bantal_sandaran !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.bantal_sandaran}
                    </Typography>
                  )}
                  {productDetails.kantong_remot !== undefined && (
                    <Typography variant="body1" gutterBottom>
                      : {productDetails.kantong_remot}
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

          {productDetails && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Detail Pengiriman</Typography>
              {shippingDetails && shippingDetails.packing_panjang ? (
                <Box>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="body1" gutterBottom>
                        Dimensi Packing
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Berat Barang
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Jumlah Coli
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body1" gutterBottom>
                        : {shippingDetails.packing_panjang} x{" "}
                        {shippingDetails.packing_lebar} x{" "}
                        {shippingDetails.packing_tinggi} cm
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        : {shippingDetails.berat_barang} kg
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        : {shippingDetails.jumlah_coli}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Data pengiriman belum tersedia.
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              {shippingDetails && shippingDetails.packing_panjang
                ? "Edit Detail Pengiriman"
                : "Tambahkan Detail Pengiriman"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle> Keterangan Pengiriman</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Dimensi Packing</Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <TextField
                label="Panjang (cm)"
                name="packing_panjang"
                type="text"
                value={additionalInfo.packing_panjang}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleInputChange(e);
                  }
                }}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid size={4}>
              <TextField
                label="Lebar (cm)"
                name="packing_lebar"
                type="text"
                value={additionalInfo.packing_lebar}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleInputChange(e);
                  }
                }}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid size={4}>
              <TextField
                label="Tinggi (cm)"
                name="packing_tinggi"
                type="text"
                value={additionalInfo.packing_tinggi}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleInputChange(e);
                  }
                }}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <TextField
            label="Berat Barang (kg)"
            name="berat_barang"
            type="text"
            value={additionalInfo.berat_barang}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                handleInputChange(e);
              }
            }}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Jumlah Coli"
            name="jumlah_coli"
            type="text"
            value={additionalInfo.jumlah_coli}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleInputChange(e);
              }
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Batal
          </Button>
          <Button onClick={handleSaveShippingDetails} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;
