// path: /src/components/Receiving/Label/SelectedProductList.js
import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  useMediaQuery,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

const SelectedProductList = ({ selectedProducts, showImage = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Responsif untuk tampilan mobile

  return (
    <List>
      <Grid container spacing={2}>
        {selectedProducts?.map((productData, index) => (
          <Grid
            size={{ xs: 12 }}
            key={index}
            sx={{
              "@media print": {
                pageBreakInside: "avoid", // Menghindari pemotongan produk di tengah halaman
                padding: "10px",
                boxSizing: "border-box",
              },
            }}
          >
            <Box
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "flex-start",
                height: "100%",
                "@media print": {
                  border: "1px solid #000", // Menggunakan border hitam untuk lebih terlihat pada cetakan
                  marginBottom: "20px",
                  pageBreakInside: "avoid", // Menghindari memotong box pada halaman yang berbeda
                },
              }}
            >
              {/* Informasi Produk */}
              <Box sx={{ flex: 1 }}>
                <Grid container>
                  <Grid size={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      Nama Pelanggan
                    </Typography>
                  </Grid>
                  <Grid size={8}>
                    <Typography variant="subtitle2">
                      :{" "}
                      {productData.detail ? productData.detail : "___________"}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />

                <Typography variant="h5" component="h2" gutterBottom>
                  {productData.product?.nama}
                </Typography>
                {/* Spesifikasi Awal */}
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Spesifikasi Awal:
                </Typography>
                <Grid container>
                  <Grid size={6}>
                    <Typography variant="body2">Ukuran</Typography>
                    {productData.productDetails?.kain && (
                      <Typography variant="body2">Kain</Typography>
                    )}
                    {productData.productDetails?.kaki && (
                      <Typography variant="body2">Kaki</Typography>
                    )}
                    {productData.productDetails?.dudukan && (
                      <Typography variant="body2">Dudukan</Typography>
                    )}
                    {productData.productDetails?.bantal_peluk && (
                      <Typography variant="body2">Bantal Peluk</Typography>
                    )}
                    {productData.productDetails?.bantal_sandaran && (
                      <Typography variant="body2">Bantal Sandaran</Typography>
                    )}
                    {productData.productDetails?.kantong_remot && (
                      <Typography variant="body2">Kantong Remote</Typography>
                    )}
                    {productData.productDetails?.puff && (
                      <Typography variant="body2">Puff</Typography>
                    )}
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="body2">
                      : {productData.product?.panjang} x{" "}
                      {productData.product?.lebar} x{" "}
                      {productData.product?.tinggi} cm
                    </Typography>
                    {productData.productDetails?.kain && (
                      <Typography variant="body2">
                        : {productData.productDetails.kain}
                      </Typography>
                    )}
                    {productData.productDetails?.kaki && (
                      <Typography variant="body2">
                        : {productData.productDetails.kaki}
                      </Typography>
                    )}
                    {productData.productDetails?.dudukan && (
                      <Typography variant="body2">
                        : {productData.productDetails.dudukan}
                      </Typography>
                    )}
                    {productData.productDetails?.bantal_peluk && (
                      <Typography variant="body2">
                        : {productData.productDetails.bantal_peluk}
                      </Typography>
                    )}
                    {productData.productDetails?.bantal_sandaran && (
                      <Typography variant="body2">
                        : {productData.productDetails.bantal_sandaran}
                      </Typography>
                    )}
                    {productData.productDetails?.kantong_remot && (
                      <Typography variant="body2">
                        : {productData.productDetails.kantong_remot}
                      </Typography>
                    )}
                    {productData.productDetails?.puff && (
                      <Typography variant="body2">
                        : {productData.productDetails.puff ? "Ya" : "Tidak"}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {/* Varian */}
                {(productData.warna || productData.finishing) && (
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Varian:
                  </Typography>
                )}
                <Grid container>
                  <Grid size={6}>
                    {productData.warna && (
                      <Typography variant="body2">Warna</Typography>
                    )}
                    {productData.finishing && (
                      <Typography variant="body2">Finishing</Typography>
                    )}
                  </Grid>
                  <Grid size={6}>
                    {productData.warna && (
                      <Typography variant="body2">
                        : {productData.warna}
                      </Typography>
                    )}
                    {productData.finishing && (
                      <Typography variant="body2">
                        : {productData.finishing}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {/* Barang Mentah dan Custom Options */}
                {productData.barangMentah && (
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Barang Mentah: {productData.barangMentah}
                  </Typography>
                )}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  Apakah custom?{" "}
                  {productData.additionalOptions?.length > 0 ? "Ya" : "Tidak"}
                </Typography>
                {productData.additionalOptions?.map((option, i) => (
                  <Grid container key={i} spacing={1}>
                    <Grid size={6}>
                      <Typography variant="body2">{option.jenis}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2">
                        : {option.label || option.nilai}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
                <Box>
                  <Grid container>
                    <Grid size={6}>
                      <Typography variant="subtitle2">Status Produk</Typography>
                      <Typography variant="subtitle2">Kelengkapan</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="subtitle2">
                        : {productData.productStatus}
                      </Typography>
                      <Typography variant="subtitle2">
                        : {productData.isComplete}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="subtitle2">
                    {productData.incompleteDetail}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

export default SelectedProductList;
