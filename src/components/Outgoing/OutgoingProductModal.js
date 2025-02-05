// path: /src/components/Outgoing/OutgoingProductModal.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Tab,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdClose } from "react-icons/md";
import { fetchFinalStockDetails } from "../../redux/reducers/finalStockReducer";
import Loading from "../Loading";

const OutgoingProductModal = ({
  open,
  onClose,
  product,
  selectedLocation,
  onAddToOutgoing,
}) => {
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  // Perbarui input pengguna
  const handleQuantityChange = (index, maxStockReady, value) => {
    const quantity = Math.max(0, Math.min(maxStockReady, Number(value))); // Batas antara 0 dan stok ready
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: quantity,
    }));
  };

  const getStokReady = (stokTersedia, stokDipesan) => {
    if (typeof stokTersedia !== "number" || typeof stokDipesan !== "number") {
      console.warn("Invalid stok values:", { stokTersedia, stokDipesan });
      return 0; // Default ke 0 jika data tidak valid
    }
    return Math.max(0, stokTersedia - stokDipesan);
  };

  useEffect(() => {
    if (open) {
      setQuantities({});
    }
  }, [open]);

  useEffect(() => {
    if (open && product && selectedLocation) {
      console.log("Modal opened with product and location:", {
        product,
        selectedLocation,
      });

      dispatch(
        fetchFinalStockDetails({
          id_lokasi: selectedLocation.id,
          id_produk: product.id_produk,
        })
      )
        .then((response) => {
          console.log("Fetch final stock details response:", response);
        })
        .catch((error) => {
          console.error("Error fetching stock details:", error);
        });
    } else {
      console.log("Modal closed or missing product/location");
    }
  }, [dispatch, open, product, selectedLocation]);

  // Ambil `selectedStockDetails` dari Redux untuk modal ini
  const stockDetails = useSelector(
    (state) => state.finalStock.selectedStockDetails
  );
  const loading = useSelector((state) => state.finalStock.loading);

  // Jika loading atau data tidak ada, tampilkan `Loading`
  if (loading) {
    return <Loading />;
  }

  // Fungsi untuk menyimpan produk yang dipilih
  const handleSaveProduct = () => {
    // Siapkan data yang akan disimpan
    const productData = {
      product,
      location: selectedLocation,
      variants: stockDetails
        .map((variant, index) => ({
          ...variant,
          jumlah: quantities[index] || 0, // Jumlah yang dipilih
        }))
        .filter((variant) => variant.jumlah > 0), // Hanya simpan varian dengan jumlah > 0
    };
    console.log("Product data to save:", productData);
    onAddToOutgoing(productData); // Kirim data ke `OutgoingList`
    onClose();
  };

  // Hitung total stok dari `stockDetails`
  const totalStock = stockDetails
    ? stockDetails.reduce(
        (sum, variant) => sum + (variant.stok_tersedia || 0),
        0
      )
    : 0;

  const getTotalStockReady = (stockDetails) => {
    return stockDetails
      ? stockDetails.reduce(
          (sum, variant) =>
            sum + getStokReady(variant.stok_tersedia, variant.stok_dipesan),
          0
        )
      : 0;
  };

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
          maxWidth: 700,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: 24,
        }}
      >
        {/* Bagian Header - Judul dan Tombol Close */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Stok Keluar</Typography>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Grid>
        {/* Bagian Atas - Informasi Produk */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
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
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {product.nama}
            </Typography>
            <Typography variant="subtitle2" fontWeight={"bold"}>
              Spesifikasi Awal:
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                <Grid size={6}>
                  <Typography variant="body2">Ukuran</Typography>
                  {stockDetails?.[0]?.sofa_kain && (
                    <Typography variant="body2">Kain</Typography>
                  )}
                  {stockDetails?.[0]?.sofa_kaki && (
                    <Typography variant="body2">Kaki</Typography>
                  )}
                  {stockDetails?.[0]?.sofa_dudukan && (
                    <Typography variant="body2">Dudukan</Typography>
                  )}
                  {stockDetails?.[0]?.sofa_bantal_peluk > 0 && (
                    <Typography variant="body2">B. Peluk</Typography>
                  )}
                  {stockDetails?.[0]?.sofa_bantal_sandaran > 0 && (
                    <Typography variant="body2">B. Sandaran</Typography>
                  )}
                  {stockDetails?.[0]?.sofa_kantong_remot > 0 && (
                    <Typography variant="body2">Kantong Remot</Typography>
                  )}
                  {stockDetails?.[0]?.sofa_puff && (
                    <Typography variant="body2">Puff</Typography>
                  )}
                  {stockDetails?.[0]?.is_raw_material && (
                    <Typography variant="body2" fontWeight={"bold"}>
                      Bahan Mentah
                    </Typography>
                  )}
                </Grid>
                <Grid size={6}>
                  <Typography variant="body2">
                    : {stockDetails?.[0]?.panjang} x {stockDetails?.[0]?.lebar}{" "}
                    x {stockDetails?.[0]?.tinggi} cm
                  </Typography>
                  {stockDetails?.[0]?.sofa_kain && (
                    <Typography variant="body2">
                      : {stockDetails[0].sofa_kain}
                    </Typography>
                  )}
                  {stockDetails?.[0]?.sofa_kaki && (
                    <Typography variant="body2">
                      : {stockDetails[0].sofa_kaki}
                    </Typography>
                  )}
                  {stockDetails?.[0]?.sofa_dudukan && (
                    <Typography variant="body2">
                      : {stockDetails[0].sofa_dudukan}
                    </Typography>
                  )}
                  {stockDetails?.[0]?.sofa_bantal_peluk > 0 && (
                    <Typography variant="body2">
                      : {stockDetails[0].sofa_bantal_peluk}
                    </Typography>
                  )}
                  {stockDetails?.[0]?.sofa_bantal_sandaran > 0 && (
                    <Typography variant="body2">
                      : {stockDetails[0].sofa_bantal_sandaran}
                    </Typography>
                  )}
                  {stockDetails?.[0]?.sofa_kantong_remot > 0 && (
                    <Typography variant="body2">
                      : {stockDetails[0].sofa_kantong_remot}
                    </Typography>
                  )}
                  {stockDetails?.[0]?.sofa_puff && (
                    <Typography variant="body2">: Ya</Typography>
                  )}
                  {stockDetails?.[0]?.is_raw_material && (
                    <Typography variant="body2">: Ya</Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        {/* Bagian Tengah - Tabel Varian */}
        <Box mt={3}>
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            Pilih Varian:
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Warna</TableCell>
                  <TableCell>Finishing</TableCell>
                  <TableCell>Tersedia</TableCell>
                  <TableCell>Dipesan</TableCell>
                  <TableCell>Ready</TableCell>
                  <TableCell>Jumlah Dikirim</TableCell>{" "}
                </TableRow>
              </TableHead>
              <TableBody>
                {stockDetails && stockDetails.length > 0 ? (
                  stockDetails.map((variant, index) => {
                    const stokReady = getStokReady(
                      variant.stok_tersedia,
                      variant.stok_dipesan
                    ); // Hitung stok_ready

                    return (
                      <TableRow key={index} hover sx={{ cursor: "pointer" }}>
                        <TableCell>
                          {variant.final_warna || "Tidak Ada"}
                        </TableCell>
                        <TableCell>
                          {variant.final_finishing || "Tidak Ada"}
                        </TableCell>
                        <TableCell>{variant.stok_tersedia}</TableCell>
                        <TableCell>{variant.stok_dipesan}</TableCell>
                        <TableCell>{stokReady}</TableCell>{" "}
                        {/* Tampilkan stok_ready */}
                        {/* Input jumlah produk, hanya bisa diisi maksimal stok_ready */}
                        <TableCell>
                          <input
                            type="number"
                            value={quantities[index] || ""}
                            min={0}
                            max={stokReady} // Pastikan tidak lebih dari stok_ready
                            onChange={(e) =>
                              handleQuantityChange(
                                index,
                                stokReady,
                                e.target.value
                              )
                            }
                            style={{ width: "60px" }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>Tidak ada varian tersedia</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Bagian Bawah - Total Stok dan Tombol "Tambah ke Pengiriman" */}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" color="text.primary">
            Total Stok: {totalStock}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            Stok Ready: {getTotalStockReady(stockDetails)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProduct}
          >
            Tambah ke Pengiriman
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OutgoingProductModal;
