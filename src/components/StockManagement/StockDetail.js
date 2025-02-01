// path: src/components/StockManagement/StockDetail.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Material UI 6 Grid
import { MdClose } from "react-icons/md";

const StockDetail = ({ open, onClose, product, warehouseId, transactions }) => {
  useEffect(() => {
    if (open && product?.id) {
      // Handle any side effects when the modal opens and product changes
    }
  }, [open, product]);

  if (!product) return null; // Jangan render modal jika produk tidak ada

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: 800,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: 24,
        }}
      >
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Detail Produk</Typography>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Grid>

        {/* Informasi Produk */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Gambar Produk */}
          <Grid size={{ xs: 6, md: 4 }}>
            <Box
              component="img"
              src={product.foto_produk}
              alt={product.nama}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 200,
                borderRadius: 1,
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Detail Produk */}
          <Grid size={{ xs: 6, md: 8 }}>
            <Typography variant="h5">{product.nama}</Typography>
            <Box sx={{ my: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
              {product.kategori && (
                <Chip label={product.kategori} color="primary" size="small" />
              )}
              {product.subkategori && (
                <Chip
                  variant="outlined"
                  label={product.subkategori}
                  color="primary"
                  size="small"
                />
              )}
            </Box>
            {/* Spesifikasi Awal */}
            <Typography variant="subtitle1">Spesifikasi Awal</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 6 }}>
                <Typography variant="body2">Ukuran</Typography>
                {product.sofa_kain && (
                  <Typography variant="body2">Kain</Typography>
                )}
                {product.sofa_kaki && (
                  <Typography variant="body2">Kaki</Typography>
                )}
                {product.sofa_dudukan && (
                  <Typography variant="body2">Dudukan</Typography>
                )}
                {product.sofa_bantal_peluk > 0 && (
                  <Typography variant="body2">Bantal Peluk</Typography>
                )}
                {product.sofa_bantal_sandaran > 0 && (
                  <Typography variant="body2">Bantal Sandaran</Typography>
                )}
                {product.sofa_kantong_remot > 0 && (
                  <Typography variant="body2">Kantong Remot</Typography>
                )}
                {product.sofa_puff && (
                  <Typography variant="body2">Puff</Typography>
                )}
              </Grid>

              <Grid size={{ xs: 6, md: 6 }}>
                <Typography variant="body2">
                  : {product.panjang} x {product.lebar} x {product.tinggi} cm
                </Typography>
                {product.sofa_kain && (
                  <Typography variant="body2">: {product.sofa_kain}</Typography>
                )}
                {product.sofa_kaki && (
                  <Typography variant="body2">: {product.sofa_kaki}</Typography>
                )}
                {product.sofa_dudukan && (
                  <Typography variant="body2">
                    : {product.sofa_dudukan}
                  </Typography>
                )}
                {product.sofa_bantal_peluk > 0 && (
                  <Typography variant="body2">
                    : {product.sofa_bantal_peluk}
                  </Typography>
                )}
                {product.sofa_bantal_sandaran > 0 && (
                  <Typography variant="body2">
                    : {product.sofa_bantal_sandaran}
                  </Typography>
                )}
                {product.sofa_kantong_remot > 0 && (
                  <Typography variant="body2">
                    : {product.sofa_kantong_remot}
                  </Typography>
                )}
                {product.sofa_puff && (
                  <Typography variant="body2">: Ya</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Tabel Varian */}
        <Box
          sx={{ display: "flex", alignItems: "center", mt: 4, mb: 2, gap: 2 }}
        >
          <Typography variant="subtitle1">Variasi Stok</Typography>
          {product.is_custom && (
            <Chip
              label="Custom"
              color="primary"
              size="small"
              sx={{
                color: "#fff",
              }}
            />
          )}
          {product.is_raw_material && (
            <Chip
              label="Bahan Mentah"
              color="error"
              size="small"
              sx={{
                color: "#fff",
              }}
            />
          )}
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Warna</TableCell>
                <TableCell>Finishing</TableCell>
                <TableCell>Stok Tersedia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{product.final_warna || "Tidak Ada"}</TableCell>
                <TableCell>{product.final_finishing || "Tidak Ada"}</TableCell>
                <TableCell>{product.stok_tersedia}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <button
            onClick={onClose}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            Tutup
          </button>
        </Box>

        {/* Transaksi */}
        <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
          Transaksi
        </Typography>

        <Grid container spacing={2}>
          {/* Incoming Transactions */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Stok Masuk
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Jumlah</TableCell>
                    <TableCell>Gudang</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    .filter((t) => t.incoming_id)
                    .map((incoming, index) => (
                      <TableRow key={`incoming-${index}`}>
                        <TableCell>
                          {new Date(incoming.incoming_date).toLocaleString()}
                        </TableCell>
                        <TableCell>{incoming.incoming_jumlah}</TableCell>
                        <TableCell>
                          {incoming.incoming_warehouse || "Tidak diketahui"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Outgoing Transactions */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Stok Keluar
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Jumlah</TableCell>
                    <TableCell>Gudang</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    .filter((t) => t.outgoing_id)
                    .map((outgoing, index) => (
                      <TableRow key={`outgoing-${index}`}>
                        <TableCell>
                          {new Date(outgoing.outgoing_date).toLocaleString()}
                        </TableCell>
                        <TableCell>{outgoing.outgoing_jumlah}</TableCell>
                        <TableCell>
                          {outgoing.outgoing_warehouse || "Tidak diketahui"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

StockDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
};

export default StockDetail;
