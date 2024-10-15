// path: /src/components/Receiving/RightDrawer.js
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery"; // Untuk mendeteksi ukuran layar

const RightDrawer = ({ open, onClose, selectedProducts }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Cek apakah di mobile

  return (
    <Drawer
      anchor="right"
      open={open || !isMobile} // Selalu buka jika bukan mobile
      onClose={isMobile ? onClose : undefined} // Hanya bisa ditutup di mobile
      variant={isMobile ? "temporary" : "persistent"} // persistent untuk desktop
      PaperProps={{
        sx: {
          maxHeight: "100vh", // Jangan melebihi tinggi viewport
          overflow: "auto", // Agar konten bisa di-scroll jika melebihi tinggi
          top: isMobile ? 0 : "64px", // Atur posisi Drawer agar tidak menutupi header di desktop
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: 300,
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Drawer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Daftar Produk Dipilih</Typography>
          {isMobile && ( // Tampilkan tombol close hanya di mobile
            <IconButton onClick={onClose}>
              <MdClose />
            </IconButton>
          )}
        </Box>
        <Divider />

        {/* Daftar Produk */}
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
            <Typography variant="body1" sx={{ mt: 2 }}>
              Belum ada produk yang dipilih.
            </Typography>
          )}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Tombol Checkout atau Aksi Lain */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Total Produk: {selectedProducts.length}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Lanjutkan Proses
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
