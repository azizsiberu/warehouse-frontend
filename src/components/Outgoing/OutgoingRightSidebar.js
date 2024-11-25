// path: /src/components/Outgoing/OutgoingRightSidebar.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Drawer,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdClose } from "react-icons/md";
import { fetchWarehouses } from "../../redux/reducers/warehouseReducer";

const OutgoingRightSidebar = ({
  selectedProducts = [],
  handleDeleteProduct,
  open,
  onClose,
  onLocationChange,
}) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil lokasi warehouse saat komponen dimuat
  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  // Hitung jumlah total produk yang dipilih
  const totalQuantity = selectedProducts.reduce(
    (total, productData) =>
      total +
      productData.variants.reduce((sum, variant) => sum + variant.jumlah, 0),
    0
  );

  // Validasi tombol lanjutkan
  const isDisabled = totalQuantity === 0;

  const handleProceed = () => {
    console.log(
      "Produk yang akan dikirim:",
      selectedProducts.map((product) => ({
        id_produk: product.product?.id_produk,
        nama: product.product?.nama,
        variants: product.variants
          .filter((variant) => variant.jumlah > 0) // Hanya varian dengan jumlah > 0
          .map((variant) => ({
            id_warna: variant.id_warna,
            id_finishing: variant.id_finishing,
            jumlah: variant.jumlah,
          })),
      }))
    );

    navigate("/outgoing-detail", {
      state: { selectedProducts },
    });
  };

  return (
    <>
      {/* Sidebar untuk desktop */}
      {!isMobile && (
        <Box
          sx={{
            maxWidth: 350,
            height: "90vh",
            position: "sticky",
            top: 64,
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          {/* Header */}
          <Box sx={{ flexShrink: 0 }}>
            <Typography variant="h6" gutterBottom>
              Produk Dipilih untuk Pengiriman
            </Typography>
            <Divider />
          </Box>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((productData, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ alignItems: "flex-start" }}>
                    <Box>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid size={3}>
                          <Box
                            component="img"
                            src={productData.product?.foto_produk}
                            alt={productData.product?.nama}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: 2,
                            }}
                          />
                        </Grid>
                        <Grid size={7}>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {productData.product?.nama} x{" "}
                              {productData.variants.reduce(
                                (sum, v) => sum + v.jumlah,
                                0
                              )}
                            </Typography>
                            {/* Menampilkan detail setiap varian */}
                            {productData.variants.map((variant, i) => (
                              <React.Fragment key={i}>
                                {variant.is_raw_material && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Bahan Mentah: Ya
                                  </Typography>
                                )}
                                {variant.is_custom && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Custom: Ya
                                  </Typography>
                                )}
                                {variant.final_warna && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Warna: {variant.final_warna}
                                  </Typography>
                                )}
                                {variant.final_finishing && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Finishing: {variant.final_finishing}
                                  </Typography>
                                )}
                              </React.Fragment>
                            ))}
                          </Box>
                        </Grid>
                        <Grid size={2}>
                          {productData.variants.map((variant, i) => (
                            <IconButton
                              key={i}
                              onClick={() =>
                                handleDeleteProduct(
                                  productData.product.id_produk,
                                  variant.id // Menghapus varian spesifik
                                )
                              }
                              color="error"
                              aria-label="delete"
                              sx={{ display: "block", marginTop: 0.5 }}
                            >
                              <MdClose />
                            </IconButton>
                          ))}
                        </Grid>
                      </Grid>
                    </Box>
                  </ListItem>
                  {index < selectedProducts.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body1">
                Belum ada produk yang dipilih.
              </Typography>
            )}
          </List>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 0 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Total Produk: {totalQuantity}
            </Typography>
            {/* Pilihan Lokasi Warehouse */}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isDisabled}
              onClick={handleProceed}
            >
              Lanjutkan Proses Pengiriman
            </Button>
          </Box>
        </Box>
      )}

      {/* Drawer untuk mobile */}
      {isMobile && (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: 300,
              display: "flex",
              flexDirection: "column",
              maxHeight: "100vh",
              overflowY: "auto",
            },
          }}
        >
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Produk Dipilih</Typography>
              <IconButton onClick={onClose}>
                <MdClose />
              </IconButton>
            </Box>

            <Divider />

            <List sx={{ flexGrow: 1 }}>
              {selectedProducts.length > 0 ? (
                selectedProducts.map((productData, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={productData.product?.nama}
                      secondary={`Jumlah: ${productData.variants.reduce(
                        (sum, variant) => sum + variant.jumlah,
                        0
                      )}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1">
                  Belum ada produk yang dipilih.
                </Typography>
              )}
            </List>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ padding: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Total Produk: {totalQuantity}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isDisabled}
              onClick={handleProceed}
            >
              Lanjutkan Proses Pengiriman
            </Button>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default OutgoingRightSidebar;
