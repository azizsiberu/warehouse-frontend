import React, { useState } from "react";
import { Button, Box, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { useNavigate } from "react-router-dom";
import { submitIncomingStockThunk } from "../../../redux/reducers/incomingStockReducer";

const SummaryActions = ({ onCancel, selectedProducts, selectedLocation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil userId dari Redux store
  const userId = useSelector((state) => state.auth.userId);

  const [errorMessage, setErrorMessage] = useState(null);
  const [missingFields, setMissingFields] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async () => {
    const incompleteProducts = selectedProducts.filter(
      (product) =>
        !product.id_produk ||
        !product.jumlah ||
        !selectedLocation?.id ||
        !userId
    );

    if (incompleteProducts.length > 0) {
      setErrorMessage("Beberapa produk memiliki data yang tidak lengkap.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    // Membuat payload sesuai struktur baru tanpa menggunakan additionalOptions
    const payload = selectedProducts.map((product) => {
      console.log("product.is_raw_material:", product.is_raw_material); // Log untuk verifikasi

      // Tentukan nilai default untuk kolom kustom
      const mappedValues = {
        id_produk: product.id_produk,
        id_warna: product.id_warna || null,
        id_finishing: product.id_finishing || null,
        is_custom: product.additionalOptions?.length > 0 || false,
        is_raw_material: product.barangMentah === "Ya", // Ambil dari barangMentah
        jumlah: product.jumlah,
        id_user: userId,
        id_lokasi: selectedLocation.id,
        ukuran: null,
        id_kain: null,
        id_kaki: null,
        id_dudukan: null,
        bantal_peluk: null,
        bantal_sandaran: null,
        kantong_remot: null,
      };

      // Loop untuk memasukkan additionalOptions ke kolom kustom
      product.additionalOptions?.forEach((option) => {
        if (option.jenis === "Ukuran") mappedValues.ukuran = option.nilai;
        else if (option.jenis === "Kain") mappedValues.id_kain = option.nilai;
        else if (option.jenis === "Kaki") mappedValues.id_kaki = option.nilai;
        else if (option.jenis === "Dudukan")
          mappedValues.id_dudukan = option.nilai;
        else if (option.jenis === "Bantal Peluk")
          mappedValues.bantal_peluk = option.nilai;
        else if (option.jenis === "Bantal Sandaran")
          mappedValues.bantal_sandaran = option.nilai;
        else if (option.jenis === "Kantong Remote")
          mappedValues.kantong_remot = option.nilai;
      });

      return mappedValues;
    });

    console.log("Payload data to be sent:", JSON.stringify(payload, null, 2));

    const response = await dispatch(submitIncomingStockThunk(payload));

    if (response.success) {
      navigate("/incoming-label", {
        state: { selectedProducts, selectedLocation },
      });
    } else {
      setErrorMessage(response.message);
      setMissingFields(response.missingFields);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: "#fff",
        py: 2,
        zIndex: 10,
        borderTop: "1px solid #ddd",
      }}
    >
      {showAlert && errorMessage && (
        <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
          {errorMessage}
          {missingFields && (
            <ul>
              {Object.entries(missingFields).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            startIcon={<MdSend />}
          >
            Kirim
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryActions;
