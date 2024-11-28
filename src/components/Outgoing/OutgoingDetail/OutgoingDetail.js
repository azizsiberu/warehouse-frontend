// path: /src/components/Outgoing/OutgoingDetail/OutgoingDetail.js
import React, { useEffect, useState } from "react";
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

  // Redux State
  const userId = useSelector((state) => state.auth.userId);
  const { selectedProducts, selectedDestination, loading, error } = useSelector(
    (state) => state.outgoingStock
  );

  // Local State
  const [deliveryData, setDeliveryData] = useState(null); // Data dari DeliveryOption

  useEffect(() => {
    // Jika selectedProducts kosong, ambil dari state navigasi
    if (!selectedProducts.length && location.state?.selectedProducts) {
      dispatch(setSelectedProducts(location.state.selectedProducts));
    }
  }, [dispatch, location.state, selectedProducts]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async () => {
    if (
      !selectedDestination ||
      (!selectedDestination.id && !selectedDestination.type)
    ) {
      alert("Pilih tujuan pengiriman terlebih dahulu.");
      return;
    }

    if (!deliveryData) {
      alert("Pilih opsi pengiriman terlebih dahulu.");
      return;
    }

    if (deliveryData.type === "kurirSendiri") {
      if (!deliveryData.data?.driver || !deliveryData.data?.driver?.id) {
        alert("Pilih atau tambahkan driver terlebih dahulu.");
        return;
      }
      if (
        !deliveryData.data?.vehicle ||
        !deliveryData.data?.vehicle?.nomor_polisi
      ) {
        alert("Pilih atau tambahkan kendaraan terlebih dahulu.");
        return;
      }
    } else if (deliveryData.type === "ekspedisiRekanan") {
      if (!deliveryData.data?.id) {
        alert("Pilih atau tambahkan ekspedisi terlebih dahulu.");
        return;
      }
    }

    if (!selectedProducts || selectedProducts.length === 0) {
      alert("Pilih setidaknya satu produk untuk dikirim.");
      return;
    }

    if (!userId) {
      alert("User tidak terdeteksi. Harap login ulang.");
      return;
    }

    const payload = selectedProducts.flatMap((product) =>
      product.variants.map((variant) => ({
        id_final_stock: variant.id,
        jumlah: variant.jumlah,
        id_user: userId,
        id_lokasi:
          selectedDestination.type === "gudang" ? selectedDestination.id : null,
        id_customer:
          selectedDestination.type === "pelanggan"
            ? selectedDestination.id
            : null,
        id_kurir:
          deliveryData.type === "kurirSendiri"
            ? deliveryData.data.driver?.id
            : null,
        id_kendaraan:
          deliveryData.type === "kurirSendiri"
            ? deliveryData.data.vehicle?.id
            : null,
        id_ekspedisi:
          deliveryData.type === "ekspedisiRekanan"
            ? deliveryData.data?.id
            : null,
        partners:
          deliveryData.type === "kurirSendiri"
            ? deliveryData.data.partners?.map((partner) => ({
                id: partner?.id,
                nama: partner?.nama,
              }))
            : [],
      }))
    );

    console.log("Final Payload:", payload);

    try {
      await dispatch(submitOutgoingStock(payload)).unwrap();
      alert("Pengiriman berhasil disimpan!");
      navigate("/outgoing-label", {
        state: {
          selectedProducts,
          selectedDestination,
          deliveryData,
          payload, // Kirim payload untuk keperluan di halaman berikutnya
        },
      });
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Terjadi kesalahan saat menyimpan data pengiriman.");
    }
  };

  const handleDeliveryOptionSave = (data) => {
    console.log("Delivery Option Data:", data);
    setDeliveryData(data);
  };

  return (
    <Box sx={{ margin: "0 auto" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
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
        <Grid size={{ xs: 12, md: 6 }}>
          <DeliveryOption onSave={handleDeliveryOptionSave} />
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
        isSubmitDisabled={(() => {
          const isDisabled =
            !selectedProducts.length ||
            !selectedDestination ||
            !deliveryData ||
            (deliveryData.type === "kurirSendiri" &&
              (!deliveryData.data?.driver || !deliveryData.data?.vehicle)) ||
            (deliveryData.type === "ekspedisiRekanan" &&
              !deliveryData.data?.id);

          // Debugging untuk setiap kondisi yang menyebabkan tombol disabled
          console.log("=== Debugging isSubmitDisabled ===");
          console.log("Selected Products:", selectedProducts.length);
          console.log("Selected Destination:", selectedDestination);
          console.log("Delivery Data:", deliveryData);
          console.log("Delivery Data Type:", deliveryData?.type);
          if (deliveryData?.type === "kurirSendiri") {
            console.log("Driver:", deliveryData.data?.driver);
            console.log("Vehicle:", deliveryData.data?.vehicle);
          }
          if (deliveryData?.type === "ekspedisiRekanan") {
            console.log("Ekspedisi ID:", deliveryData.data?.id);
          }
          console.log("Is Submit Disabled:", isDisabled);
          console.log("==============================");

          return isDisabled;
        })()}
      />
    </Box>
  );
};

export default OutgoingDetail;
