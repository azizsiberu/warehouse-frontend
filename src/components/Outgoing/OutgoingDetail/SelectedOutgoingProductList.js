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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderSpecifications = (variant) => {
    const specifications = [
      {
        label: "Ukuran",
        value:
          variant.ukuran ||
          `${variant.panjang} x ${variant.lebar} x ${variant.tinggi} cm`,
      },
      { label: "Kain", value: variant.final_kain || variant.sofa_kain },
      { label: "Kaki", value: variant.final_kaki || variant.sofa_kaki },
      {
        label: "Dudukan",
        value: variant.final_dudukan || variant.sofa_dudukan,
      },
      {
        label: "Bantal Peluk",
        value: variant.final_bantal_peluk || variant.sofa_bantal_peluk,
      },
      {
        label: "Bantal Sandaran",
        value: variant.final_bantal_sandaran || variant.sofa_bantal_sandaran,
      },
      {
        label: "Kantong Remote",
        value: variant.final_kantong_remot || variant.sofa_kantong_remot,
      },
      { label: "Puff", value: variant.final_puff || variant.sofa_puff },
    ];

    return specifications
      .filter((spec) => spec.value)
      .map((spec, i) => (
        <Grid container key={i}>
          <Grid size={6}>
            <Typography variant="body2">{spec.label}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">: {spec.value}</Typography>
          </Grid>
        </Grid>
      ));
  };

  const renderVariants = (variant) => {
    const variants = [
      { label: "Warna", value: variant.final_warna },
      { label: "Finishing", value: variant.final_finishing },
    ];

    return variants
      .filter((varSpec) => varSpec.value)
      .map((varSpec, i) => (
        <Grid container key={i}>
          <Grid size={6}>
            <Typography variant="body2">{varSpec.label}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="body2">: {varSpec.value}</Typography>
          </Grid>
        </Grid>
      ));
  };

  return (
    <List>
      <Grid container spacing={2}>
        {selectedProducts?.map((productData) =>
          productData.variants.map((variant) => (
            <Grid
              size={{ xs: 12, sm: 6 }}
              key={`${productData.product.id}-${variant.id}`}
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
                }}
              >
                {/* Gambar Produk */}
                <Box
                  component="img"
                  src={productData.product?.foto_produk}
                  alt={productData.product?.nama}
                  sx={{
                    width: isMobile ? "100%" : 120,
                    height: isMobile ? 180 : 120,
                    objectFit: "cover",
                    borderRadius: 2,
                    mr: isMobile ? 0 : 2,
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
                  {renderSpecifications(variant)}

                  {/* Varian Khusus */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Varian:
                  </Typography>
                  {renderVariants(variant)}

                  {/* Chips untuk Status */}
                  <Box sx={{ mt: 1 }}>
                    {variant.is_raw_material && (
                      <Chip
                        label="Bahan Mentah"
                        color="secondary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                    )}
                    {variant.is_custom && (
                      <Chip label="Custom" color="primary" size="small" />
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </List>
  );
};

export default SelectedOutgoingProductList;
