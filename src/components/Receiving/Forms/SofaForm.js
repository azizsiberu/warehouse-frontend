// path: src/components/Receiving/Forms/SofaForm.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchProductById,
  fetchKainAttributes,
  fetchKakiAttributes,
  fetchDudukanAttributes,
  fetchWarnaByKainId,
  fetchFinishingAttributes,
} from "../../../redux/reducers/productReducer";

const SofaForm = ({
  productId,
  product,
  onAdditionalChange,
  onDataChange,
  validationErrors = {},
  setValidationErrors,
  setFinishingVisible,
}) => {
  const dispatch = useDispatch();
  const {
    kainAttributes,
    kakiAttributes,
    dudukanAttributes,
    warnaOptions,
    finishingOptions,
  } = useSelector((state) => state.products);

  const [additionalOptions, setAdditionalOptions] = useState([
    { jenis: "", nilai: "" },
  ]);
  const [selectedWarna, setSelectedWarna] = useState("");
  const [selectedFinishing, setSelectedFinishing] = useState("");
  const [selectedWarnaId, setSelectedWarnaId] = useState("");
  const [selectedFinishingId, setSelectedFinishingId] = useState("");

  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
    // Fetch attributes when component mounts or when product changes
    dispatch(fetchKainAttributes());
    dispatch(fetchKakiAttributes());
    dispatch(fetchDudukanAttributes());
    dispatch(fetchFinishingAttributes());

    if (product) {
      dispatch(fetchWarnaByKainId(product.id_kain));
    }

    setFinishingVisible(isFinishingVisible(additionalOptions));
  }, [dispatch, product]);

  const isFinishingVisible = (options) => {
    console.log("Options:", options); // Log semua options untuk verifikasi

    // Mencari opsi kaki berdasarkan id_kaki dalam additionalOptions
    const legOption = options.find((option) => option.jenis === "Kaki");

    // Mengambil nilai kaki dari additionalOptions jika ada
    const legValue = legOption ? legOption.nilai : null;

    // Mencari nama kaki berdasarkan id_kaki jika legValue ada
    const selectedKakiOption = legValue
      ? kakiAttributes.find((option) => option.id_kaki === legValue)
      : null;

    // Dapatkan nama kaki dari opsi atau gunakan nilai dari product.kaki sebagai fallback
    const legName = selectedKakiOption
      ? selectedKakiOption.jenis_kaki
      : productDetails?.kaki;

    // Tambahan console log untuk debugging
    console.log("Leg Option:", legOption);
    console.log("Leg Value (id_kaki):", legValue);
    console.log(
      "Leg Name from Options:",
      selectedKakiOption ? selectedKakiOption.jenis_kaki : "null"
    );
    console.log("Product Kaki:", productDetails?.kaki);
    console.log("Leg Name (used for check):", legName);

    // Daftar nama kaki yang mendukung opsi finishing
    const finishingVisibleLegs = ["Balok Kayu", "Skandinavian"];
    const isVisible = finishingVisibleLegs.includes(legName);

    // Log hasil akhir
    console.log("Is Finishing Visible:", isVisible);

    return isVisible;
  };

  // useEffect pertama: Mengambil warna berdasarkan `productDetails` saat pertama kali load
  useEffect(() => {
    if (productDetails?.id_kain) {
      dispatch(fetchWarnaByKainId(productDetails.id_kain));
    }
  }, [dispatch, productDetails]);

  useEffect(() => {
    // Cek apakah ada custom kain dalam additionalOptions
    const customKainOption = additionalOptions.find(
      (option) => option.jenis === "Kain"
    );
    const kainIdToFetch = customKainOption
      ? customKainOption.nilai
      : product?.id_kain;

    if (kainIdToFetch) {
      dispatch(fetchWarnaByKainId(kainIdToFetch));
    }
  }, [additionalOptions, product?.id_kain, dispatch]);

  const handleAdditionalChange = (index, field, value) => {
    const updatedOptions = [...additionalOptions];
    updatedOptions[index][field] = value;

    // Filter additionalOptions untuk mengabaikan entri yang kosong
    const filteredOptions = updatedOptions.filter(
      (option) => option.jenis && option.nilai
    );

    setAdditionalOptions(updatedOptions);

    // Kirim data yang sudah difilter ke parent, hanya jika ada isi tambahan
    onDataChange({
      id_produk: productId,
      ...(filteredOptions.length > 0 && { additionalOptions: filteredOptions }), // Hanya kirim jika ada data valid
      warna: selectedWarna,
      finishing: selectedFinishing,
    });

    if (field === "jenis" && value === "Kain") {
      const kainId = updatedOptions[index].nilai;
      if (kainId) {
        dispatch(fetchWarnaByKainId(kainId));
      }
    }

    // Validasi hanya `nilai` jika `jenis` dipilih
    if (updatedOptions[index].jenis && !updatedOptions[index].nilai) {
      validationErrors[`additionalOptions[${index}].nilai`] =
        "Nilai harus diisi";
    } else {
      delete validationErrors[`additionalOptions[${index}].nilai`];
    }

    setValidationErrors({ ...validationErrors });

    setFinishingVisible(isFinishingVisible(updatedOptions));
  };

  const handleWarnaChange = (value, id) => {
    setSelectedWarna(value);
    setSelectedWarnaId(id);

    const filteredOptions = additionalOptions.filter(
      (option) => option.jenis && option.nilai
    );

    onDataChange({
      id_produk: productId,
      ...(filteredOptions.length > 0 && { additionalOptions: filteredOptions }), // Hanya kirim jika ada data valid
      warna: value,
      id_warna: id,
      finishing: selectedFinishing,
      id_finishing: selectedFinishingId,
    });
  };

  const handleFinishingChange = (value, id) => {
    setSelectedFinishing(value);
    setSelectedFinishingId(id);

    const filteredOptions = additionalOptions.filter(
      (option) => option.jenis && option.nilai
    );

    onDataChange({
      id_produk: productId,
      ...(filteredOptions.length > 0 && { additionalOptions: filteredOptions }), // Hanya kirim jika ada data valid
      warna: selectedWarna,
      id_warna: selectedWarnaId,
      finishing: value,
      id_finishing: id,
    });
  };

  const addAdditionalOption = () => {
    setAdditionalOptions([...additionalOptions, { jenis: "", nilai: "" }]);
  };

  const removeAdditionalOption = (index) => {
    const updatedOptions = additionalOptions.filter((_, i) => i !== index);
    setAdditionalOptions(updatedOptions);
    onDataChange({
      additionalOptions: updatedOptions,
      warna: selectedWarna,
      finishing: selectedFinishing,
    });

    // Hapus error yang relevan dari validationErrors
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`additionalOptions[${index}].nilai`]; // Hapus error berdasarkan indeks
      return newErrors;
    });

    // Cek apakah kain custom dihapus
    const customKainOption = updatedOptions.find(
      (option) => option.jenis === "Kain"
    );

    if (!customKainOption && productDetails?.id_kain) {
      // Jika tidak ada kain custom, ambil warna dari `productDetails`
      setSelectedWarna(""); // Reset warna di state
      dispatch(fetchWarnaByKainId(productDetails.id_kain));
    }

    setFinishingVisible(isFinishingVisible(updatedOptions));
  };

  const handleRemoveAll = () => {
    setAdditionalOptions([]); // Kosongkan semua opsi tambahan
    onDataChange({
      additionalOptions: [],
      warna: selectedWarna,
      finishing: selectedFinishing,
    });

    // Hapus semua error yang terkait dengan additionalOptions dari validationErrors
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith("additionalOptions")) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });

    // Reset warna ke warna dari `productDetails` setelah semua opsi dihapus
    if (productDetails?.id_kain) {
      setSelectedWarna(""); // Reset warna di state
      dispatch(fetchWarnaByKainId(productDetails.id_kain));
    }

    setFinishingVisible(false); // Set finishing visibility jika diperlukan
  };

  const getOptionsForJenis = (jenis) => {
    switch (jenis) {
      case "Kain":
        return kainAttributes.map((option) => ({
          value: option.id_kain,
          label: option.kain,
        }));
      case "Kaki":
        return kakiAttributes.map((option) => ({
          value: option.id_kaki,
          label: option.jenis_kaki,
        }));
      case "Dudukan":
        return dudukanAttributes.map((option) => ({
          value: option.id_dudukan,
          label: option.dudukan,
        }));
      default:
        return [];
    }
  };

  return (
    <Box sx={{ maxHeight: 350, overflowY: "scroll" }}>
      <Grid container spacing={1}>
        {/* Spesifikasi Produk */}
        <Grid item size={12}>
          <Grid container spacing={1}>
            <Grid item size={6}>
              <Typography variant="body2" gutterBottom>
                Ukuran
              </Typography>
              {productDetails?.kain && (
                <Typography variant="body2" gutterBottom>
                  Kain
                </Typography>
              )}
              {productDetails?.kaki && (
                <Typography variant="body2" gutterBottom>
                  Jenis Kaki
                </Typography>
              )}
              {productDetails?.dudukan && (
                <Typography variant="body2" gutterBottom>
                  Jenis Dudukan
                </Typography>
              )}
            </Grid>
            <Grid item size={6}>
              <Typography variant="body2" gutterBottom>
                : {productDetails?.panjang} x {productDetails?.lebar} x{" "}
                {productDetails?.tinggi} cm
              </Typography>
              {productDetails?.kain && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.kain}
                </Typography>
              )}
              {productDetails?.kaki && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.kaki}
                </Typography>
              )}
              {productDetails?.dudukan && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.dudukan}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item size={6}>
              {productDetails?.bantal_peluk && (
                <Typography variant="body2" gutterBottom>
                  Bantal Peluk
                </Typography>
              )}
              {productDetails?.bantal_sandaran && (
                <Typography variant="body2" gutterBottom>
                  Bantal Sandaran
                </Typography>
              )}
              {productDetails?.kantong_remot && (
                <Typography variant="body2" gutterBottom>
                  Kantong Remote
                </Typography>
              )}
              {productDetails?.puff && (
                <Typography variant="body2" gutterBottom>
                  Puff
                </Typography>
              )}
            </Grid>
            <Grid item size={6}>
              {productDetails?.bantal_peluk && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.bantal_peluk}
                </Typography>
              )}
              {productDetails?.bantal_sandaran && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.bantal_sandaran}
                </Typography>
              )}
              {productDetails?.kantong_remot && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.kantong_remot}
                </Typography>
              )}
              {productDetails?.puff && (
                <Typography variant="body2" gutterBottom>
                  : {productDetails?.puff ? "Ya" : "Tidak"}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        component="ul"
        p={1}
        m={0}
        sx={{ border: "1px solid #ccc", borderRadius: 2, mt: 1 }}
      >
        <Grid container spacing={1}>
          <Grid size={5}>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
              Jenis
            </Typography>
          </Grid>
          <Grid size={5}>
            <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
              Nilai
            </Typography>
          </Grid>
          {additionalOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Grid size={5}>
                <FormControl fullWidth size="small">
                  <InputLabel>Pilih Jenis</InputLabel>
                  <Select
                    value={option.jenis}
                    label="Pilih Jenis"
                    onChange={(e) =>
                      handleAdditionalChange(index, "jenis", e.target.value)
                    }
                  >
                    <MenuItem value="Ukuran">Ukuran</MenuItem>
                    <MenuItem value="Kain">Kain</MenuItem>
                    <MenuItem value="Kaki">Kaki</MenuItem>
                    <MenuItem value="Dudukan">Dudukan</MenuItem>
                    <MenuItem value="Bantal Peluk">Bantal Peluk</MenuItem>
                    <MenuItem value="Bantal Sandaran">Bantal Sandaran</MenuItem>
                    <MenuItem value="Kantong Remote">Kantong Remote</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={5}>
                {option.jenis === "Kain" ||
                option.jenis === "Kaki" ||
                option.jenis === "Dudukan" ? (
                  <FormControl
                    fullWidth
                    size="small"
                    error={
                      !!validationErrors[`additionalOptions[${index}].nilai`]
                    }
                  >
                    <InputLabel>Pilih Nilai</InputLabel>
                    <Select
                      value={option.nilai}
                      label="Pilih Nilai"
                      onChange={(e) =>
                        handleAdditionalChange(index, "nilai", e.target.value)
                      }
                    >
                      {getOptionsForJenis(option.jenis).map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {validationErrors[`additionalOptions[${index}].nilai`] && (
                      <FormHelperText>
                        {validationErrors[`additionalOptions[${index}].nilai`]}
                      </FormHelperText>
                    )}
                  </FormControl>
                ) : option.jenis === "Ukuran" ? (
                  <TextField
                    fullWidth
                    size="small"
                    label="Nilai"
                    value={option.nilai}
                    onChange={(e) =>
                      handleAdditionalChange(index, "nilai", e.target.value)
                    }
                    placeholder="Masukkan ukuran"
                    error={
                      !!validationErrors[`additionalOptions[${index}].nilai`]
                    }
                    helperText={
                      validationErrors[`additionalOptions[${index}].nilai`] ||
                      ""
                    }
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Nilai"
                    value={option.nilai}
                    onChange={(e) =>
                      handleAdditionalChange(index, "nilai", e.target.value)
                    }
                    placeholder="Masukkan nilai"
                    error={
                      !!validationErrors[`additionalOptions[${index}].nilai`]
                    }
                    helperText={
                      validationErrors[`additionalOptions[${index}].nilai`] ||
                      ""
                    }
                  />
                )}
              </Grid>

              <Grid item xs={2} display="flex">
                <IconButton
                  onClick={() => removeAdditionalOption(index)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Grid container spacing={1}>
          <Grid size={6}>
            <Button
              onClick={addAdditionalOption}
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
            >
              Tambah Pilihan
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              onClick={handleRemoveAll}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
            >
              Hapus Semua
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl
              fullWidth
              size="small"
              error={!!validationErrors.warna}
            >
              <InputLabel id="pilihan-warna">Pilih Warna</InputLabel>
              <Select
                labelId="pilihan-warna"
                value={selectedWarna}
                label="Pilih Warna"
                onChange={(e) => {
                  const selectedOption = warnaOptions.find(
                    (w) => w.warna === e.target.value
                  );
                  handleWarnaChange(e.target.value, selectedOption.id_warna);
                }}
              >
                {warnaOptions.map((warna) => (
                  <MenuItem key={warna.id_warna} value={warna.warna}>
                    {warna.warna}
                  </MenuItem>
                ))}
              </Select>
              {validationErrors.warna && (
                <FormHelperText>{validationErrors.warna}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          {isFinishingVisible(additionalOptions) && (
            <Grid size={6}>
              <FormControl
                fullWidth
                size="small"
                error={!!validationErrors.finishing}
              >
                <InputLabel id="pilihan-finishing">Finishing</InputLabel>
                <Select
                  labelId="pilihan-finishing"
                  value={selectedFinishing}
                  label="Finishing"
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
                  <FormHelperText>{validationErrors.finishing}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default SofaForm;
