// path: src/components/ScheduleManagement/FinalScheduleDrawer.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import { fetchFinalScheduleById } from "../../redux/reducers/scheduleReducer";

const FinalScheduleDrawer = ({ open, onClose, scheduleId }) => {
  const dispatch = useDispatch();

  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Ambil data dari Redux (pastikan finalScheduleDetails digunakan)
  const rawScheduleDetail = useSelector(
    (state) => state.schedules.finalScheduleDetails
  );
  const loading = useSelector((state) => state.schedules.loadingDetail);

  // Pastikan jika berbentuk array, hanya ambil elemen pertama
  const scheduleDetail =
    Array.isArray(rawScheduleDetail) && rawScheduleDetail.length > 0
      ? rawScheduleDetail[0]
      : rawScheduleDetail;

  useEffect(() => {
    if (open && scheduleId) {
      console.log("Fetching final schedule for ID:", scheduleId);
      dispatch(fetchFinalScheduleById(scheduleId));
    }
  }, [open, scheduleId, dispatch]);

  useEffect(() => {
    console.log("Redux State Updated:", scheduleDetail);
  }, [scheduleDetail]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Bagian 1: Informasi Pelanggan */}
        <Box sx={{ mb: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Detail Jadwal Akhir</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : scheduleDetail ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2">Sales</Typography>
                <Typography variant="body2">Pelanggan</Typography>
                <Typography variant="body2">Tgl Kirim</Typography>
                <Typography variant="body2">Alamat</Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  : {scheduleDetail.sales_name}
                </Typography>
                <Typography variant="body2">
                  : {scheduleDetail.nama_pelanggan}
                </Typography>
                <Typography variant="body2">
                  :{" "}
                  {new Date(
                    scheduleDetail.tanggal_pengiriman
                  ).toLocaleDateString("id-ID")}
                </Typography>
                <Typography variant="body2">
                  :{" "}
                  {capitalizeWords(
                    ` ${scheduleDetail.kecamatan}, ${scheduleDetail.kabupaten}`
                  )}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography align="center">Data tidak ditemukan</Typography>
          )}
        </Box>

        {/* Bagian 2: Detail Produk */}
        <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
          <Typography variant="h6">Detail Produk</Typography>
          <Divider sx={{ my: 1 }} />
          {Array.isArray(scheduleDetail?.product_details) &&
          scheduleDetail.product_details.length > 0 ? (
            scheduleDetail.product_details.map((product, index) => {
              // Gunakan data final jika tersedia, jika tidak gunakan data dari sofa
              const ukuran = product.final_stock?.ukuran || product.dimensi;
              const kain =
                product.final_stock?.kain || product.sofa_details?.kain;
              const dudukan =
                product.final_stock?.jenis_dudukan ||
                product.sofa_details?.dudukan;
              const kaki =
                product.final_stock?.jenis_kaki ||
                product.sofa_details?.jenis_kaki;
              const bantalPeluk = product.sofa_details?.bantal_peluk;
              const bantalSandaran = product.sofa_details?.bantal_sandaran;

              return (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 1,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Kiri: Foto Produk */}
                    <Grid size={4}>
                      <Box
                        component="img"
                        src={product.product_photo}
                        alt={product.product_name}
                        sx={{ width: "100%", borderRadius: 2 }}
                      />
                    </Grid>

                    {/* Kanan: Informasi Produk */}
                    <Grid size={8}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {product.product_name}
                      </Typography>
                      <Chip
                        label={product.final_stock.lokasi}
                        color="primary"
                        size="small"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          {product.final_stock.warna && (
                            <Typography variant="body2">Warna</Typography>
                          )}
                          {product.final_stock.finishing && (
                            <Typography variant="body2">Finishing</Typography>
                          )}
                        </Box>
                        <Box>
                          {product.final_stock.warna && (
                            <Typography variant="body2">
                              : {product.final_stock.warna}
                            </Typography>
                          )}
                          {product.final_stock.finishing && (
                            <Typography variant="body2">
                              : {product.final_stock.finishing}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Spesifikasi Detail */}
                  <Box
                    sx={{ mt: 1, p: 1, bgcolor: "#f9f9f9", borderRadius: 1 }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Spesifikasi:
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        {ukuran && (
                          <Typography variant="body2">Ukuran</Typography>
                        )}
                        {kain && <Typography variant="body2">Kain</Typography>}
                        {dudukan && (
                          <Typography variant="body2">Dudukan</Typography>
                        )}
                        {kaki && <Typography variant="body2">Kaki</Typography>}
                        {bantalPeluk !== null && (
                          <Typography variant="body2">Bantal Peluk</Typography>
                        )}
                        {bantalSandaran !== null && (
                          <Typography variant="body2">
                            Bantal Sandaran
                          </Typography>
                        )}
                      </Grid>
                      <Grid size={6}>
                        {ukuran && (
                          <Typography variant="body2">: {ukuran}</Typography>
                        )}
                        {kain && (
                          <Typography variant="body2">: {kain}</Typography>
                        )}
                        {dudukan && (
                          <Typography variant="body2">: {dudukan}</Typography>
                        )}
                        {kaki && (
                          <Typography variant="body2">: {kaki}</Typography>
                        )}
                        {bantalPeluk !== null && (
                          <Typography variant="body2">
                            : {bantalPeluk}
                          </Typography>
                        )}
                        {bantalSandaran !== null && (
                          <Typography variant="body2">
                            : {bantalSandaran}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="body2">Tidak ada produk</Typography>
          )}
        </Box>

        {/* Bagian 3: Tombol Kirim */}
        <Box>
          <Button variant="contained" color="primary" fullWidth>
            Kirim
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FinalScheduleDrawer;
