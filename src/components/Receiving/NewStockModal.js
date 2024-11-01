//path: src/components/Receiving/NewStockModal.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SofaForm from "./Forms/SofaForm";
import KayuForm from "./Forms/KayuForm";
import FabrikasiForm from "./Forms/FabrikasiForm";
import KomplimenForm from "./Forms/KomplimenForm";
import { MdClose, MdAddCircle, MdRemoveCircle } from "react-icons/md";

const NewStockModal = ({ open, onClose, product, handleSubmitProduct }) => {
  const [formData, setFormData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [finishingVisible, setFinishingVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (open) {
      setFormData({});
      setValidationErrors({});
    }
  }, [open, product]);

  // Fungsi tambahan untuk menangani perubahan additionalOptions
  const handleAdditionalChange = (additionalOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      additionalOptions,
    }));
  };

  const handleFormDataChange = (data) => {
    setFormData(data);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClose = () => {
    setFormData({}); // Reset form data
    setQuantity(1); // Reset quantity
    onClose(); // Panggil fungsi onClose yang dikirim dari parent
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submissionData = {
      product, // Kirim seluruh objek `product`
      id_produk: product.id_produk,
      ...formData,
      jumlah: quantity,
    };

    console.log("Data from NewStockModal to ReceivingList:", submissionData); // Log data ke console
    handleSubmitProduct(submissionData);
    onClose();
  };

  // Fungsi validasi formulir
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validasi untuk SofaForm
    if (product.jenis_produk === "Sofa") {
      if (!formData.warna) {
        errors.warna = "Warna harus diisi.";
        isValid = false;
      }
      if (finishingVisible && !formData.finishing) {
        errors.finishing = "Finishing harus diisi.";
        isValid = false;
      }
      (formData.additionalOptions || []).forEach((option, index) => {
        if (option.jenis && !option.nilai) {
          errors[`additionalOptions[${index}].nilai`] = "Nilai harus diisi.";
          isValid = false;
        }
      });
    }

    setValidationErrors(errors);
    return isValid;
  };

  const renderForm = () => {
    switch (product?.jenis_produk) {
      case "Sofa":
        return (
          <SofaForm
            productId={product.id_produk}
            onDataChange={handleFormDataChange}
            onAdditionalChange={handleAdditionalChange}
            setFinishingVisible={setFinishingVisible}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        );
      case "Kayu":
        return (
          <KayuForm
            productId={product.id_produk}
            onDataChange={handleFormDataChange}
            onAdditionalChange={handleAdditionalChange}
            setFinishingVisible={setFinishingVisible}
          />
        );
      case "Fabrikasi":
        return (
          <FabrikasiForm
            productId={product.id_produk}
            onDataChange={handleFormDataChange}
            onAdditionalChange={handleAdditionalChange}
            setFinishingVisible={setFinishingVisible}
          />
        );
      case "Komplimen":
        return (
          <KomplimenForm
            productId={product.id_produk}
            onDataChange={handleFormDataChange}
            onAdditionalChange={handleAdditionalChange}
            setFinishingVisible={setFinishingVisible}
          />
        );
      default:
        return <Typography>Jenis produk tidak dikenal.</Typography>;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          width: "90%",
          maxWidth: 500,
          boxShadow: 24,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Tambah Stok</Typography>
          <IconButton onClick={handleClose}>
            <MdClose />
          </IconButton>
        </Grid>
        <Box
          mb={2}
          sx={{
            backgroundColor: "#F8F9FD",
            p: 1,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid size={2}>
              <img
                src={product.foto_produk}
                alt={product.nama}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 16,
                  borderRadius: 4,
                }}
              />
            </Grid>
            <Grid size={6}>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{product.nama}</Typography>
              </Box>
            </Grid>
            <Grid size={2} display="flex" gap={1} sx={{ alignItems: "center" }}>
              <IconButton onClick={decrementQuantity}>
                <MdRemoveCircle />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={incrementQuantity} color="primary">
                <MdAddCircle />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1">Spesifikasi:</Typography>
          <Box
            component="ul"
            p={0}
            m={0}
            sx={{ border: "1px", borderRadius: 2 }}
          >
            {renderForm()}
          </Box>
        </Box>{" "}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewStockModal;
