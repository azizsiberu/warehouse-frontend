import React from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdClose } from "react-icons/md";

const RightSidebar = ({ open, onClose, selectedProducts }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Deteksi apakah mobile
  const handleDeleteProduct = (productId) => {};

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
              selectedProducts.map((product, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ alignItems: "flex-start" }}>
                    {/* Gambar Produk */}
                    <Box>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid size={3}>
                          <Box
                            component="img"
                            src={product.foto_produk} // pastikan "gambar" ada di product
                            alt={product.nama}
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
                              {product.nama} x {product.jumlah}
                            </Typography>

                            {/* Status Custom */}
                            <Typography variant="body2" color="text.secondary">
                              Custom:{" "}
                              {product.customOptions.length > 0
                                ? "Ya"
                                : "Tidak"}
                            </Typography>
                            <Typography variant="body2">
                              {product.warna && `Warna: ${product.warna}`}
                              {product.finishing &&
                                ` | Finishing: ${product.finishing}`}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={2}>
                          <IconButton
                            onClick={() => handleDeleteProduct(product.id)}
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
              Total Produk: {selectedProducts.length}
            </Typography>
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
                selectedProducts.map((product, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={product.nama}
                      secondary={`Jumlah: ${product.jumlah}`}
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
              Total Produk: {selectedProducts.length}
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
