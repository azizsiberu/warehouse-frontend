// path: /src/components/Outgoing/OutgoingDetail/OutgoingDetail.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Divider, Chip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import SelectedOutgoingProductList from "./SelectedOutgoingProductList";
import OutgoingSummaryActions from "./OutgoingSummaryActions";
import ShippingDestination from "./ShippingDestination";
import DeliveryOption from "./DeliveryOption";
import {
  setSelectedProducts,
  setSelectedDestination,
  submitOutgoingStock,
} from "../../../redux/reducers/outgoingStockReducer";

const OutgoingDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useSelector((state) => state.auth.userId); // Ambil id_user dari Redux state
  console.log("User ID:", userId);

  const { selectedProducts, selectedDestination, loading, error } = useSelector(
    (state) => state.outgoingStock
  );

  useEffect(() => {
    // Jika selectedProducts kosong, ambil dari state navigasi
    if (!selectedProducts.length && location.state?.selectedProducts) {
      dispatch(setSelectedProducts(location.state.selectedProducts));
    }
  }, [dispatch, location.state, selectedProducts]);

  useEffect(() => {
    console.log("Selected Products:", selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    console.log("Selected Destination:", selectedDestination);
    if (selectedDestination?.type === "pelanggan") {
      console.log("Selected Customer ID:", selectedDestination.id);
    }
  }, [selectedDestination]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async () => {
    if (!selectedProducts.length || !selectedDestination) {
      alert("Produk atau tujuan pengiriman tidak boleh kosong.");
      return;
    }

    if (!userId) {
      alert("User tidak terdeteksi. Harap login ulang.");
      return;
    }

    console.log("Selected Products yg akan dikirim:", selectedProducts);
    console.log("Selected Destination yg akan dikirim:", selectedDestination);
    console.log("ID User yg akan dikirim:", userId);

    const payload = selectedProducts.flatMap((product) =>
      product.variants.map((variant) => ({
        id_final_stock: variant.id, // ID Final Stock
        jumlah: variant.jumlah, // Jumlah produk
        id_user: userId, // ID User
        id_lokasi:
          selectedDestination.type === "gudang" ? selectedDestination.id : null,
        id_pelanggan:
          selectedDestination.type === "pelanggan"
            ? selectedDestination.id
            : null,
      }))
    );

    console.log("Payload Before Validation:", payload);

    // Validasi Payload
    const invalidPayload = payload.filter((item) => {
      if (!item.id_final_stock) {
        console.warn("Missing id_final_stock:", item);
        return true;
      }
      if (!item.jumlah) {
        console.warn("Invalid jumlah:", item);
        return true;
      }
      if (!item.id_lokasi && !item.id_pelanggan) {
        console.warn("Missing id_lokasi and id_pelanggan:", item);
        return true;
      }
      return false;
    });

    if (invalidPayload.length > 0) {
      console.log("Invalid Payload Details:", invalidPayload);
      alert("Beberapa data produk atau tujuan tidak lengkap.");
      return;
    }

    console.log("Final Payload to Send:", payload);

    // Kirim ke backend
    dispatch(submitOutgoingStock(payload))
      .unwrap()
      .then(() => {
        alert("Pengiriman berhasil disimpan!");
        navigate("/outgoing-label", {
          state: { selectedProducts, selectedDestination },
        });
      })
      .catch((err) => {
        console.error("Error during submission:", err);
        alert("Terjadi kesalahan saat menyimpan data pengiriman.");
      });
  };

  return (
    <Box sx={{ margin: "0 auto" }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <ShippingDestination
            selectedDestination={selectedDestination}
            onSelectDestination={(destination) =>
              dispatch(setSelectedDestination(destination))
            }
            onSelectCustomer={(customer) =>
              dispatch(
                setSelectedDestination({ type: "pelanggan", id: customer?.id })
              )
            }
          />
        </Grid>
        <Grid size={6}>
          <DeliveryOption
            onSave={(deliveryData) =>
              console.log("Delivery Data Saved:", deliveryData)
            }
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Produk yang akan dikirim
      </Typography>
      <SelectedOutgoingProductList selectedProducts={selectedProducts} />
      <OutgoingSummaryActions
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        selectedProducts={selectedProducts}
      />
    </Box>
  );
};

export default OutgoingDetail;
