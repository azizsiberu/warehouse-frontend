// path: /src/components/Outgoing/OutgoingDetail/SelectedOutgoingProductList.js
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

const SelectedOutgoingProductList = ({ selectedProducts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Responsif untuk tampilan mobile

  // Debugging log untuk data yang diterima
  console.log("Rendering SelectedOutgoingProductList:");
  console.log("Selected Products:", selectedProducts);

  return (
    <List>
      <Grid container spacing={2}>
        {selectedProducts?.map((productData, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Box
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                display: "flex",
                flexDirection: isMobile ? "column" : "row", // Kolom di mobile, baris di desktop
                alignItems: "flex-start",
                height: "100%",
              }}
            >
              {/* Gambar Produk */}
              <Box
                component="img"
                src={productData.product?.foto_produk}
                alt={productData.product?.nama}
                sx={{
                  width: isMobile ? "100%" : 120, // Penuh di mobile, tetap kecil di desktop
                  height: isMobile ? 180 : 120,
                  objectFit: "cover",
                  borderRadius: 2,
                  mr: isMobile ? 0 : 2, // Spasi antara gambar dan deskripsi pada desktop
                  mb: isMobile ? 2 : 0,
                }}
              />

              {/* Informasi Produk */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {productData.product?.nama}
                </Typography>
                <Chip
                  label={`Jumlah: ${productData.variants.reduce(
                    (sum, v) => sum + v.jumlah,
                    0
                  )}`}
                  color="primary"
                />
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Spesifikasi Produk:
                </Typography>

                {/* Varian Produk */}
                {productData.variants.map((variant, i) => (
                  <Grid container>
                    <Grid size={6}>
                      <Typography variant="body2">Ukuran</Typography>
                      {variant.final_kain || variant.sofa_kain ? (
                        <Typography variant="body2">Kain</Typography>
                      ) : null}
                      {variant.final_kaki || variant.sofa_kaki ? (
                        <Typography variant="body2">Kaki</Typography>
                      ) : null}
                      {variant.final_dudukan || variant.sofa_dudukan ? (
                        <Typography variant="body2">Dudukan</Typography>
                      ) : null}
                      {variant.final_bantal_peluk ||
                      variant.sofa_bantal_peluk > 0 ? (
                        <Typography variant="body2">Bantal Peluk</Typography>
                      ) : null}
                      {variant.final_bantal_sandaran ||
                      variant.sofa_bantal_sandaran > 0 ? (
                        <Typography variant="body2">Bantal Sandaran</Typography>
                      ) : null}
                      {variant.final_kantong_remot ||
                      variant.sofa_kantong_remot > 0 ? (
                        <Typography variant="body2">Kantong Remote</Typography>
                      ) : null}
                      {variant.final_puff || variant.sofa_puff ? (
                        <Typography variant="body2">Puff</Typography>
                      ) : null}
                    </Grid>
                    <Grid size={6}>
                      {variant.ukuran ||
                      (variant.panjang && variant.lebar && variant.tinggi) ? (
                        <Typography variant="body2">
                          :{" "}
                          {variant.ukuran ||
                            `${variant.panjang} x ${variant.lebar} x ${variant.tinggi} cm`}
                        </Typography>
                      ) : null}
                      {variant.final_kain || variant.sofa_kain ? (
                        <Typography variant="body2">
                          : {variant.final_kain || variant.sofa_kain}
                        </Typography>
                      ) : null}
                      {variant.final_kaki || variant.sofa_kaki ? (
                        <Typography variant="body2">
                          : {variant.final_kaki || variant.sofa_kaki}
                        </Typography>
                      ) : null}
                      {variant.final_dudukan || variant.sofa_dudukan ? (
                        <Typography variant="body2">
                          : {variant.final_dudukan || variant.sofa_dudukan}
                        </Typography>
                      ) : null}
                      {variant.final_bantal_peluk ||
                      variant.sofa_bantal_peluk > 0 ? (
                        <Typography variant="body2">
                          :{" "}
                          {variant.final_bantal_peluk ||
                            variant.sofa_bantal_peluk}
                        </Typography>
                      ) : null}
                      {variant.final_bantal_sandaran ||
                      variant.sofa_bantal_sandaran > 0 ? (
                        <Typography variant="body2">
                          :{" "}
                          {variant.final_bantal_sandaran ||
                            variant.sofa_bantal_sandaran}
                        </Typography>
                      ) : null}
                      {variant.final_kantong_remot ||
                      variant.sofa_kantong_remot > 0 ? (
                        <Typography variant="body2">
                          :{" "}
                          {variant.final_kantong_remot ||
                            variant.sofa_kantong_remot}
                        </Typography>
                      ) : null}
                      {variant.final_puff || variant.sofa_puff ? (
                        <Typography variant="body2">: Ya</Typography>
                      ) : null}
                    </Grid>
                    <Grid size={12}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", mt: 1 }}
                      >
                        Varian:
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      {variant.final_warna ? (
                        <Typography variant="body2">Warna</Typography>
                      ) : null}
                      {variant.final_finishing ? (
                        <Typography variant="body2">Finishing</Typography>
                      ) : null}
                    </Grid>
                    <Grid size={6}>
                      {variant.final_warna ? (
                        <Typography variant="body2">
                          : {variant.final_warna}
                        </Typography>
                      ) : null}
                      {variant.final_finishing ? (
                        <Typography variant="body2">
                          : {variant.final_finishing}
                        </Typography>
                      ) : null}
                    </Grid>
                    <Grid size={12}>
                      {variant.is_raw_material && (
                        <Chip
                          label="Bahan Mentah"
                          color="secondary"
                          size="small"
                        />
                      )}
                      {variant.is_custom && (
                        <Chip label="Custom" color="primary" size="small" />
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </List>
  );
};

export default SelectedOutgoingProductList;
