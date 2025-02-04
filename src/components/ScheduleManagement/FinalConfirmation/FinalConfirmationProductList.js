// path: src/components/ScheduleManagement/FinalConfirmation/FinalConfirmationProductList.js
import React, { useEffect } from "react";
import { Box, Typography, Divider, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";

const FinalConfirmationProductList = ({ selectedStocks = [], schedule }) => {
  // Gunakan `schedule.product_details` jika `selectedStocks` kosong
  const products =
    selectedStocks.length > 0
      ? selectedStocks
      : schedule?.product_details || [];

  // 🔍 Log debugging untuk memastikan data benar
  useEffect(() => {
    console.log(
      "📌 [FinalConfirmationProductList] Produk dari Redux:",
      selectedStocks
    );
    console.log(
      "📌 [FinalConfirmationProductList] Produk dari Schedule:",
      schedule?.product_details
    );
    console.log(
      "📌 [FinalConfirmationProductList] Produk yang akan ditampilkan:",
      products
    );
  }, [selectedStocks, schedule]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Produk yang Akan Dikirim:
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {products.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product, index) => {
            // Mengambil data spesifikasi dari `final_stock` atau `sofa_details`
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
            const warna = product.final_stock?.warna;
            const finishing = product.final_stock?.finishing;
            const lokasi = product.final_stock?.lokasi;

            return (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      {/* Foto Produk */}
                      <Box
                        component="img"
                        src={product.product_photo}
                        alt={product.product_name}
                        sx={{
                          width: 150,
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                      {/* Detail Produk */}
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {product.product_name} x{" "}
                          {product.schedule_details.jumlah} unit
                        </Typography>
                        <Chip label={lokasi} size="small" color="primary" />
                        <Grid container spacing={1}>
                          <Grid size={4}>
                            {warna && (
                              <Typography variant="body2">Warna</Typography>
                            )}
                            {finishing && (
                              <Typography variant="body2">Finishing</Typography>
                            )}
                          </Grid>
                          <Grid size={8}>
                            {warna && (
                              <Typography variant="body2">: {warna}</Typography>
                            )}
                            {finishing && (
                              <Typography variant="body2">
                                : {finishing}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Spesifikasi Detail */}
                  <Box sx={{ mt: 1, p: 1, bgcolor: "#fff", borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Spesifikasi:
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid size={{ xs: 12, md: 6 }}></Grid>
                      <Grid size={{ xs: 12, md: 6 }}></Grid>
                      <Grid container spacing={1}>
                        <Grid size={12}>
                          {ukuran && (
                            <Typography variant="body2">
                              Ukuran: {ukuran}
                            </Typography>
                          )}
                          {kain && (
                            <Typography variant="body2">
                              Kain: {kain}
                            </Typography>
                          )}
                          {dudukan && (
                            <Typography variant="body2">
                              Dudukan: {dudukan}
                            </Typography>
                          )}
                          {kaki && (
                            <Typography variant="body2">
                              Kaki: {kaki}
                            </Typography>
                          )}
                          {bantalPeluk !== null && (
                            <Typography variant="body2">
                              Bantal Peluk: {bantalPeluk}
                            </Typography>
                          )}
                          {bantalSandaran !== null && (
                            <Typography variant="body2">
                              Bantal Sandaran: {bantalSandaran}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Tidak ada produk yang dipilih.
        </Typography>
      )}
    </Box>
  );
};

export default FinalConfirmationProductList;
