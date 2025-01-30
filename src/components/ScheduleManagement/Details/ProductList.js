import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProductList = ({ scheduleDetails }) => {
  const products = scheduleDetails?.product_details || [];

  console.log("Received products:", products);

  if (!Array.isArray(products) || products.length === 0) {
    console.error("Expected products to be a non-empty array.");
    return <Typography>Error: Produk tidak ditemukan.</Typography>;
  }

  const renderSpesification = (product) => {
    const details = product.custom
      ? {
          kain: product.custom_details?.kain ?? product.sofa_details?.kain,
          jenis_kaki:
            product.custom_details?.jenis_kaki ??
            product.sofa_details?.jenis_kaki,
          dudukan:
            product.custom_details?.dudukan ?? product.sofa_details?.dudukan,
          bantal_peluk:
            product.custom_details?.bantal_peluk ??
            product.sofa_details?.bantal_peluk,
          bantal_sandaran:
            product.custom_details?.bantal_sandaran ??
            product.sofa_details?.bantal_sandaran,
          kantong_remote:
            product.custom_details?.kantong_remote ??
            product.sofa_details?.kantong_remote,
          puff: product.custom_details?.puff ?? product.sofa_details?.puff,
        }
      : product.sofa_details;

    return (
      <Grid container spacing={2}>
        <Grid size={6}>
          <Typography>Dimensi</Typography>
          {details.kain && <Typography>Kain</Typography>}
          {details.jenis_kaki && <Typography>Kaki</Typography>}
          {details.dudukan && <Typography>Dudukan</Typography>}
          {details.bantal_peluk !== null &&
            details.bantal_peluk !== undefined && (
              <Typography>Bantal Peluk</Typography>
            )}
          {details.bantal_sandaran !== null &&
            details.bantal_sandaran !== undefined && (
              <Typography>Bantal Sandaran</Typography>
            )}
          {details.kantong_remote !== null &&
            details.kantong_remote !== undefined && (
              <Typography>Kain Remot</Typography>
            )}
          {details.puff !== null && details.puff !== undefined && (
            <Typography>Puff</Typography>
          )}
        </Grid>

        <Grid size={6}>
          <Typography>
            :{" "}
            {product.custom_details?.dimensi ||
              product.sofa_details?.dimensi ||
              product.dimensi}{" "}
            cm
          </Typography>
          {details.kain && <Typography>: {details.kain}</Typography>}
          {details.jenis_kaki && (
            <Typography>: {details.jenis_kaki}</Typography>
          )}
          {details.dudukan && <Typography>: {details.dudukan}</Typography>}
          {details.bantal_peluk !== null &&
            details.bantal_peluk !== undefined && (
              <Typography>: {details.bantal_peluk}</Typography>
            )}
          {details.bantal_sandaran !== null &&
            details.bantal_sandaran !== undefined && (
              <Typography>: {details.bantal_sandaran}</Typography>
            )}
          {details.kantong_remote !== null &&
            details.kantong_remote !== undefined && (
              <Typography>: {details.kantong_remote}</Typography>
            )}
          {details.puff !== null && details.puff !== undefined && (
            <Typography>: {details.puff ? "Ya" : "Tidak"}</Typography>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Produk yang Dipesan
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => {
          console.log(`Rendering product ${index + 1}:`, product);

          return (
            <Grid key={product.product_id || index} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid size={4}>
                    <Box
                      component="img"
                      src={product.product_photo}
                      alt={product.product_name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 2,
                        objectFit: "cover",
                        aspectRatio: "1",
                      }}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="h6">{product.product_name}</Typography>
                    {renderSpesification(product)}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Typography>Warna</Typography>
                    <Typography>Finishing</Typography>
                    <Typography>Catatan</Typography>
                  </Grid>
                  <Grid size={6}>
                    {product.custom?.warna && (
                      <Typography>: {product.custom.warna}</Typography>
                    )}
                    {product.custom?.finishing && (
                      <Typography>: {product.custom.finishing}</Typography>
                    )}
                    {product.custom?.catatan && (
                      <Typography>: {product.custom.catatan}</Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductList;
