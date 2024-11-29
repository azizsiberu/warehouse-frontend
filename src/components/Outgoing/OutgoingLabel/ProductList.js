// Path: /src/components/Outgoing/OutgoingLabel/ProductList.js

import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProductList = ({ selectedProducts }) => {
  // Fungsi untuk merender spesifikasi produk
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

  // Fungsi untuk merender varian produk
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

  // Hitung total jumlah produk
  const totalQuantity = selectedProducts.reduce(
    (total, product) =>
      total +
      product.variants.reduce((sum, variant) => sum + variant.jumlah, 0),
    0
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Daftar Produk:{" "}
      </Typography>
      <List>
        {selectedProducts.map((product) =>
          product.variants.map((variant) => (
            <React.Fragment key={`${product.product.id}-${variant.id}`}>
              <ListItem>
                <Box sx={{ width: "100%" }}>
                  <Grid container>
                    {/* Nama Produk di Kiri */}
                    <Grid size={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {product.product.nama}
                      </Typography>
                    </Grid>
                    {/* Jumlah di Kanan */}
                    <Grid size={6}>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", textAlign: "right" }}
                      >
                        {variant.jumlah} pcs
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Grid container>
                    <Grid size={6}>
                      {/* Spesifikasi Produk */}
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold" }}
                        >
                          Spesifikasi Produk:
                        </Typography>
                        {renderSpecifications(variant)}
                      </>
                    </Grid>
                    <Grid size={6}>
                      {/* Varian Produk */}
                      {(variant.final_warna || variant.final_finishing) && (
                        <>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mt: 1 }}
                          >
                            Varian:
                          </Typography>
                          {renderVariants(variant)}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        )}
      </List>

      {/* Total Jumlah Produk */}
      <Box sx={{ mt: 3 }}>
        <Grid container>
          <Grid size={6}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Total
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", textAlign: "right" }}
            >
              {totalQuantity} pcs
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductList;
