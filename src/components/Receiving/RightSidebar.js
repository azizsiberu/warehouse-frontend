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
            width: 300,
            maxHeight: "100vh",
            overflowY: "auto",
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
          <Divider sx={{ my: 2 }} />
          <Box>
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
