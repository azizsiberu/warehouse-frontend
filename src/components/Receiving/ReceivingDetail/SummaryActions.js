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
    const selectedProduct = selectedProducts[0];

    const payload = {
      id_produk: selectedProduct.id_produk,
      id_warna: selectedProduct.id_warna,
      id_finishing: selectedProduct.id_finishing,
      is_custom: selectedProduct.additionalOptions?.length > 0,
      is_raw_material: selectedProduct.is_raw_material || false,
      jumlah: selectedProduct.jumlah,
      id_user: userId, // Menggunakan userId dari Redux
      id_lokasi: selectedLocation.id,
      additionalOptions: selectedProduct.additionalOptions?.map((option) => ({
        jenis: option.jenis,
        nilai: option.nilai,
        label: option.label || null,
      })),
    };

    const response = await dispatch(submitIncomingStockThunk(payload));

    if (response.success) {
      navigate("/incoming-label", {
        state: { selectedProducts, selectedLocation },
      });
    } else {
      // Tangani kesalahan dengan memperbarui errorMessage dan missingFields
      setErrorMessage(response.message);
      setMissingFields(response.missingFields);
      setShowAlert(true);

      // Hide alert after 3 seconds
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
