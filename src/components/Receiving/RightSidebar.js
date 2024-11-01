import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const RightSidebar = ({
  selectedProducts,
  handleDeleteProduct,
  open,
  onClose,
}) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const { locations } = useSelector((state) => state.warehouses); // Mengambil lokasi dari Redux
  const [selectedLocation, setSelectedLocation] = useState("");
  const dispatch = useDispatch();

  // Ambil lokasi warehouse saat komponen dimuat
  useEffect(() => {
    dispatch(fetchWarehouses());
    console.log("fetching warehouses: ", locations);
  }, [dispatch]);

  const totalQuantity = selectedProducts.reduce(
    (total, productData) => total + productData.jumlah,
    0
  );

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
              Produk Dipilih
            </Typography>
            <Divider />
          </Box>
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((productData, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ alignItems: "flex-start" }}>
                    {/* Gambar Produk */}
                    <Box>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid size={3}>
                          <Box
                            component="img"
                            src={productData.product?.foto_produk} // pastikan "gambar" ada di product
                            alt={productData.product?.nama}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              mr: 2,
                              borderRadius: 2,
                            }}
                          />
                        </Grid>
                        <Grid size={7}>
                          {/* Detail Produk */}
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {productData.product?.nama} x {productData.jumlah}
                            </Typography>

                            {/* Status Custom */}
                            <Typography variant="body2" color="text.secondary">
                              Custom:{" "}
                              {productData.additionalOptions?.length > 0
                                ? "Ya"
                                : "Tidak"}
                            </Typography>
                            <Typography variant="body2">
                              {productData.warna &&
                                `Warna: ${productData.warna}`}
                              {productData.finishing &&
                                ` | Finishing: ${productData.finishing}`}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={2}>
                          <IconButton
                            onClick={() =>
                              handleDeleteProduct(productData.id_produk)
                            } // Panggil handleDeleteProduct
                            color="error"
                            aria-label="delete"
                          >
                            <MdClose />
                          </IconButton>
                        </Grid>
                        <Grid size={12}>
                          {/* Tampilkan options jika ada */}
                          <Box sx={{ ml: 1 }}></Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </ListItem>

                  {/* Tambahkan Divider antara produk kecuali untuk item terakhir */}
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
            {" "}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Total Produk: {totalQuantity}
            </Typography>
            {/* Pilihan Lokasi Warehouse */}
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            >
              <InputLabel id="select-location-label">Pilih Lokasi</InputLabel>
              <Select
                labelId="select-location-label"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label="Pilih Lokasi"
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.lokasi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" fullWidth>
              Lanjutkan Proses
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
                      secondary={`Jumlah: ${productData.jumlah}`}
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
            <Button variant="contained" color="primary" fullWidth>
              Lanjutkan Proses
            </Button>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default RightSidebar;
