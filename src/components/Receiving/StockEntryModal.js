import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/reducers/productReducer";

const StockEntryModal = ({ open, onClose, productId }) => {
  const dispatch = useDispatch();
  const { productDetails, loading } = useSelector((state) => state.products); // Ambil detail produk dari redux

  useEffect(() => {
    if (open && productId) {
      dispatch(fetchProductById(productId)); // Panggil thunk untuk mengambil detail produk berdasarkan id
    }
  }, [dispatch, open, productId]);

  if (!open) return null; // Jangan render modal jika tidak terbuka

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label={productDetails.kategori} color="primary" />
              <Chip
                label={productDetails.subkategori}
                color="primary"
                variant="outlined"
              />
            </Stack>
            <Typography variant="h3" component="h2">
              {productDetails?.nama || "Loading..."}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Vendor: {productDetails?.vendor || "Tidak tersedia"}
            </Typography>

            {/* Spesifikasi Detail */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Spesifikasi Detail:
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {/* Spesifikasi Kiri */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {productDetails?.panjang && (
                      <Typography variant="body1" gutterBottom>
                        Dimensi
                      </Typography>
                    )}
                    {productDetails?.style && (
                      <Typography variant="body1" gutterBottom>
                        Style
                      </Typography>
                    )}
                    {productDetails?.kain && (
                      <Typography variant="body1" gutterBottom>
                        Kain
                      </Typography>
                    )}
                    {productDetails?.kaki && (
                      <Typography variant="body1" gutterBottom>
                        Jenis Kaki
                      </Typography>
                    )}
                    {productDetails?.seat_type && (
                      <Typography variant="body1" gutterBottom>
                        Jenis Dudukan
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {productDetails?.panjang && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.panjang} x {productDetails.lebar} x{" "}
                        {productDetails.tinggi} cm
                      </Typography>
                    )}
                    {productDetails?.style && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.style}
                      </Typography>
                    )}
                    {productDetails?.kain && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.fabric}
                      </Typography>
                    )}
                    {productDetails?.kaki && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.leg_type}
                      </Typography>
                    )}
                    {productDetails?.dudukan && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.seat_type}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Spesifikasi Kanan */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {productDetails?.throw_pillows !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        Bantal Peluk
                      </Typography>
                    )}
                    {productDetails?.back_cushions !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        Bantal Sandaran
                      </Typography>
                    )}
                    {productDetails?.remote_pockets !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        Kantong Remote
                      </Typography>
                    )}
                    {productDetails?.puff !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        Puff
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {productDetails?.throw_pillows !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.throw_pillows}
                      </Typography>
                    )}
                    {productDetails?.back_cushions !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.back_cushions}
                      </Typography>
                    )}
                    {productDetails?.remote_pockets !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.remote_pockets}
                      </Typography>
                    )}
                    {productDetails?.puff !== undefined && (
                      <Typography variant="body1" gutterBottom>
                        : {productDetails.puff ? "Ya" : "Tidak"}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Form untuk menambah stok dan variasi */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField label="Jumlah Stok" type="number" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Warna" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Ukuran" fullWidth />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Tambahkan Stok
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default StockEntryModal;
