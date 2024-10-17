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
import useMediaQuery from "@mui/material/useMediaQuery";
import { MdClose } from "react-icons/md";

const RightSidebar = ({ open, onClose, selectedProducts }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Deteksi apakah mobile

  return (
    <>
      {/* Sidebar untuk desktop */}
      {!isMobile && (
        <Box
          sx={{
            maxWidth: 300,
            height: "75vh", // Set fixed height
            maxHeight: "100vh",
            position: "sticky", // Sticky position
            top: 0, // Sticky di bagian atas viewport

            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid #ccc", // Border pemisah
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Produk Dipilih
          </Typography>
          <Divider sx={{ my: 2 }} />
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ alignItems: "flex-start" }}>
                    {/* Gambar Produk */}
                    <Box
                      component="img"
                      src={product.foto_produk} // pastikan "gambar" ada di product
                      alt={product.nama}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        mr: 2,
                        borderRadius: 2,
                      }}
                    />

                    {/* Detail Produk */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight="bold">
                        {product.nama}
                      </Typography>
                      <Typography variant="body2">
                        Jumlah: {product.jumlah}
                      </Typography>

                      {/* Status Custom */}
                      <Typography variant="body2" color="text.secondary">
                        Custom:{" "}
                        {product.customOptions.length > 0 ? "Ya" : "Tidak"}
                      </Typography>

                      {/* Tampilkan custom options jika ada */}
                      {product.customOptions.length > 0 && (
                        <Box sx={{ ml: 1 }}>
                          {/* Warna */}
                          {product.warna && (
                            <Typography variant="body2">
                              Warna: {product.warna}
                            </Typography>
                          )}
                          {/* Finishing */}
                          {product.finishing && (
                            <Typography variant="body2">
                              Finishing: {product.finishing}
                            </Typography>
                          )}
                        </Box>
                      )}
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
          <Box sx={{ mt: "auto" }}>
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
