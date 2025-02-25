//path: src/components/ScheduleManagement/Details/ProductList.js
import React, { useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch } from "react-redux";
import StockAccordion from "./StockAccordion";

const ProductList = ({ scheduleDetails, finalStock, error }) => {
  const products = scheduleDetails?.product_details || [];

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
      <Box>
        <Typography variant="h6">Spesifikasi</Typography>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
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
      </Box>
    );
  };

  const renderVariants = (product) => {
    return (
      <Box sx={{ marginTop: 2 }}>
        {product.warna || product.finishing ? (
          <Typography variant="h6">Varian</Typography>
        ) : null}
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid size={6}>
            {product.warna && <Typography>Warna</Typography>}
            {product.finishing && <Typography>Finishing</Typography>}
          </Grid>
          <Grid size={6}>
            {product.warna && <Typography>: {product.warna}</Typography>}
            {product.finishing && (
              <Typography>: {product.finishing}</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2}>
        {products.map((product, index) => {
          console.log(`Rendering product ${index + 1}:`, product);

          return (
            <Grid key={product.product_id || index} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid size={5}>
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
                  <Grid size={7}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h5">
                        {product.product_name} x {product.quantity}
                      </Typography>
                    </Box>
                    {renderSpesification(product)}
                    {renderVariants(product)}
                  </Grid>
                </Grid>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Stok Tersedia
                </Typography>
                <StockAccordion
                  productId={product.product_id}
                  finalStock={finalStock}
                  error={error}
                  onSelectStock={(selectedStock) => {
                    console.log("Stok yang dipilih:", selectedStock);
                    // Tambahkan logika untuk mengupdate Redux atau state lokal di sini
                  }}
                  orderedQuantity={product.quantity}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductList;
