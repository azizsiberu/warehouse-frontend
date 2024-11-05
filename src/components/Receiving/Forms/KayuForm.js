// path: src/components/Receiving/Forms/KayuForm.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFinishingAttributes,
  fetchProductById,
} from "../../../redux/reducers/productReducer";

const KayuForm = ({
  product,
  onAdditionalChange,
  onDataChange,
  productId,
  validationErrors = {},
  setValidationErrors,
}) => {
  const dispatch = useDispatch();
  const { finishingOptions } = useSelector((state) => state.products);
  const [selectedFinishing, setSelectedFinishing] = useState("");
  const [selectedFinishingId, setSelectedFinishingId] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState([
    { jenis: "", nilai: "" },
  ]);
  const [barangMentah, setBarangMentah] = useState("");

  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  // Memuat finishingOptions dari Redux saat komponen di-mount
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    dispatch(fetchFinishingAttributes());
  }, [dispatch]);

  const handleAdditionalChange = (index, field, value) => {
    const updatedOptions = [...additionalOptions];
    updatedOptions[index][field] = value;

    setAdditionalOptions(updatedOptions);

    onDataChange({
      id_produk: productId,
      additionalOptions: updatedOptions,
      productDetails,
      finishing: selectedFinishing,
      id_finishing: selectedFinishingId,
      barangMentah,
    });

    // Validasi hanya `nilai` jika `jenis` dipilih
    if (updatedOptions[index].jenis && !updatedOptions[index].nilai) {
      validationErrors[`additionalOptions[${index}].nilai`] =
        "Nilai harus diisi";
    } else {
      delete validationErrors[`additionalOptions[${index}].nilai`];
    }
  };

  const handleBarangMentahChange = (event) => {
    const value = event.target.value;
    setBarangMentah(value);

    if (value === "Ya") {
      setSelectedFinishing("");
      setSelectedFinishingId("");
    }

    const filteredOptions = additionalOptions.filter(
      (option) => option.jenis && option.nilai
    );

    onDataChange({
      id_produk: productId,
      additionalOptions: filteredOptions, // Pastikan filteredOptions digunakan di sini
      productDetails,
      finishing: value === "Ya" ? "" : selectedFinishing,
      id_finishing: value === "Ya" ? "" : selectedFinishingId,
      barangMentah: value,
    });
  };

  const addAdditionalOption = () => {
    setAdditionalOptions([...additionalOptions, { jenis: "", nilai: "" }]);
  };

  const removeAdditionalOption = (index) => {
    const updatedOptions = additionalOptions.filter((_, i) => i !== index);
    setAdditionalOptions(updatedOptions);

    // Filter additionalOptions untuk mengabaikan entri yang kosong
    const filteredOptions = updatedOptions.filter(
      (option) => option.jenis && option.nilai
    );

    // Bersihkan error dari opsi tambahan yang dihapus
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`additionalOptions[${index}].nilai`];
      return newErrors;
    });

    onDataChange({
      id_produk: productId,
      ...(filteredOptions.length > 0 && { additionalOptions: filteredOptions }),
      productDetails,
      finishing: selectedFinishing,
      id_finishing: selectedFinishingId,
      barangMentah,
    });
  };

  const handleRemoveAll = () => {
    setAdditionalOptions([]);
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith("additionalOptions")) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });

    onDataChange({
      id_produk: productId,
      additionalOptions: [],
      finishing: selectedFinishing,
      id_finishing: selectedFinishingId,
      barangMentah,
    });
  };

  const handleFinishingChange = (value, id) => {
    setSelectedFinishing(value);
    setSelectedFinishingId(id);

    if (barangMentah === "Tidak" && !value) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        finishing: "Finishing harus diisi",
      }));
    } else {
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.finishing;
        return newErrors;
      });
    }

    const filteredOptions = additionalOptions.filter(
      (option) => option.jenis && option.nilai
    );

    onDataChange({
      id_produk: productId,
      ...(filteredOptions.length > 0 && { additionalOptions: filteredOptions }),
      finishing: value,
      id_finishing: id,
      barangMentah,
    });
  };

  return (
    <Box sx={{ maxHeight: 350, overflowY: "scroll" }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Typography variant="body2">Ukuran</Typography>
        </Grid>
        <Grid size={8}>
          <Typography variant="body2">
            : {productDetails?.panjang} x {productDetails?.lebar} x{" "}
            {productDetails?.tinggi} cm
          </Typography>
        </Grid>
      </Grid>

      <Box
        component="ul"
        p={1}
        m={0}
        sx={{ border: "1px solid #ccc", borderRadius: 2, mt: 1 }}
      >
        <Grid container spacing={1}>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
              Jenis
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
              Nilai
            </Typography>
          </Grid>
          {additionalOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Grid size={5}>
                <FormControl fullWidth size="small">
                  <InputLabel id={`jenis-label-${index}`}>
                    Pilih Jenis
                  </InputLabel>
                  <Select
                    labelId={`jenis-label-${index}`}
                    value={option.jenis}
                    label="Pilih Jenis"
                    onChange={(event) =>
                      handleAdditionalChange(index, "jenis", event.target.value)
                    }
                  >
                    <MenuItem value="Ukuran">Ukuran</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={5}>
                <TextField
                  fullWidth
                  size="small"
                  value={option.nilai}
                  onChange={(event) =>
                    handleAdditionalChange(index, "nilai", event.target.value)
                  }
                  placeholder="Masukkan nilai"
                  error={
                    !!validationErrors[`additionalOptions[${index}].nilai`]
                  }
                  helperText={
                    validationErrors[`additionalOptions[${index}].nilai`] || ""
                  }
                />
              </Grid>
              <Grid size={2} display="flex">
                <IconButton
                  onClick={() => removeAdditionalOption(index)}
                  color="secondary"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid size={6}>
            <Button onClick={addAdditionalOption} variant="contained" fullWidth>
              Tambah Pilihan
            </Button>
          </Grid>
          <Grid size={6}>
            <Button onClick={handleRemoveAll} variant="outlined" fullWidth>
              Hapus Semua
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Pilihan Barang Mentah dengan Radio */}
      <Box sx={{ mt: 2 }}>
        <FormControl component="fieldset">
          <Typography variant="body2" gutterBottom>
            Barang Mentah?
          </Typography>
          <RadioGroup
            row
            value={barangMentah}
            onChange={handleBarangMentahChange}
          >
            <FormControlLabel value="Ya" control={<Radio />} label="Ya" />
            <FormControlLabel value="Tidak" control={<Radio />} label="Tidak" />
          </RadioGroup>
          {validationErrors.barangMentah && (
            <FormHelperText color="error" variant="body2">
              {validationErrors.barangMentah}
            </FormHelperText>
          )}
        </FormControl>
      </Box>

      {/* Finishing Field (Hanya jika Barang Mentah adalah Tidak) */}
      {barangMentah === "Tidak" && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <FormControl
                fullWidth
                size="small"
                error={!!validationErrors.finishing}
              >
                <InputLabel id="pilihan-finishing">Pilih Finishing</InputLabel>
                <Select
                  labelId="pilihan-finishing"
                  value={selectedFinishing}
                  label="Pilih Finishing"
                  onChange={(e) => {
                    const selectedOption = finishingOptions.find(
                      (f) => f.finishing === e.target.value
                    );
                    handleFinishingChange(
                      e.target.value,
                      selectedOption.id_finishing
                    );
                  }}
                >
                  {finishingOptions.map((finishing) => (
                    <MenuItem
                      key={finishing.id_finishing}
                      value={finishing.finishing}
                    >
                      {finishing.finishing}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.finishing && (
                  <FormHelperText color="error" variant="body2">
                    {validationErrors.finishing}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default KayuForm;
