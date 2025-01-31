// path: src/components/ScheduleManagement/Details/ProductDrawer.js
import React, { useEffect, useState } from "react";
import { Drawer, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchFinalStockByScheduleId } from "../../../redux/reducers/scheduleReducer";

const ProductDrawer = ({ open, onClose, productId }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  // Memanggil fetch ketika Drawer terbuka dan productId ada
  useEffect(() => {
    if (open && productId) {
      console.log(`Fetching final stock for product ID: ${productId}`);

      dispatch(fetchFinalStockByScheduleId(productId))
        .then((data) => {
          setProductData(data); // Menyimpan data produk setelah fetch berhasil
        })
        .catch((error) => {
          console.error("Error fetching product stock:", error);
          setError("Failed to load product data");
        });
    }
  }, [open, productId, dispatch]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Product Details</Typography>

        {error && <Typography color="error">{error}</Typography>}
        {productData && (
          <Box>
            <Typography variant="body1">
              Product Name: {productData.product_name}
            </Typography>
            <Typography variant="body2">Stock: {productData.stock}</Typography>
            {/* Tampilkan data produk lainnya di sini */}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ProductDrawer;
