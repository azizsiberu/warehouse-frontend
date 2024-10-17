// path: /src/components/Receiving/StockEntryModal.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  Stack,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux"; // Jika menggunakan Redux
import {
  fetchProductById,
  fetchKainAttributes,
  fetchKakiAttributes,
  fetchDudukanAttributes,
  fetchWarnaByKainId,
  fetchFinishingAttributes,
} from "../../redux/reducers/productReducer"; // Action untuk mengambil produk berdasarkan ID
import Loading from "../Loading"; // Jika ada animasi loading
import { MdAdd, MdRemove, MdDelete } from "react-icons/md"; // Import icons from react-icons

const StockEntryModal = ({ open, onClose, productId, onSubmit }) => {
  const dispatch = useDispatch();

  const [newStock, setNewStock] = useState(""); // Untuk input stok baru
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error jika input tidak valid

  const [quantity, setQuantity] = useState(1); // Default value of 1

  // State untuk custom entries
  const [additionalOptions, setAdditionalOptions] = useState([
    { jenis: "", nilai: "" },
  ]);
  const [validationErrors, setValidationErrors] = useState({});

  // State untuk menyimpan pilihan terakhir
  const [selectedKain, setSelectedKain] = useState(null); // Pilihan kain untuk fetch warna nanti
  const [selectedKaki, setSelectedKaki] = useState(null);
  const [selectedDudukan, setSelectedDudukan] = useState(null);

  const [selectedWarna, setSelectedWarna] = useState("");
  const [selectedFinishing, setSelectedFinishing] = useState(null); // State untuk pilihan finishing

  const [prevKainId, setPrevKainId] = useState(null);

  // Ambil data dari Redux Store
  const kainAttributes = useSelector((state) => state.products.kainAttributes);
  const kakiAttributes = useSelector((state) => state.products.kakiAttributes);
  const dudukanAttributes = useSelector(
    (state) => state.products.dudukanAttributes
  );
  const warnaOptions = useSelector((state) => state.products.warnaOptions);
  const finishingOptions = useSelector(
    (state) => state.products.finishingOptions
  );
  const { productDetails, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch all data when the modal is opened
  useEffect(() => {
    if (open) {
      if (productId) {
        // Always fetch product details when modal opens
        dispatch(fetchProductById(productId));
      }

      // Fetch attributes if not yet fetched
      if (!kainAttributes.length) dispatch(fetchKainAttributes());
      if (!kakiAttributes.length) dispatch(fetchKakiAttributes());
      if (!dudukanAttributes.length) dispatch(fetchDudukanAttributes());
      if (!finishingOptions.length) dispatch(fetchFinishingAttributes());
    }
  }, [
    dispatch,
    open,
    productId,
    kainAttributes,
    kakiAttributes,
    dudukanAttributes,
    finishingOptions,
  ]);

  // Fetch warna berdasarkan kainId dari produk atau custom
  useEffect(() => {
    let kainId = null;

    if (productDetails?.id_kain) {
      kainId = productDetails.id_kain;
    }

    const selectedCustomKain = additionalOptions.find(
      (option) => option.jenis === "Kain"
    );
    if (selectedCustomKain?.nilai) {
      kainId = selectedCustomKain.nilai;
    }

    // Hanya fetch jika kainId berubah
    if (kainId && kainId !== prevKainId) {
      dispatch(fetchWarnaByKainId(kainId));
      setPrevKainId(kainId);

      // Reset selectedWarna hanya jika tidak valid dengan warnaOptions baru
      setSelectedWarna("");
    }
  }, [dispatch, productDetails?.id_kain, additionalOptions, prevKainId]);

  const handleIncrement = useCallback(() => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }, [quantity]);

  const handleStockSubmit = () => {
    if (!productDetails?.id_produk) {
      console.error("Product ID is missing");
      return;
    }

    // Kumpulkan data yang diisi user
    const productData = {
      id: productDetails.id_produk, // ID Produk dari productDetails (pastikan sudah ada)
      nama: productDetails.nama,
      foto_produk: productDetails.foto_produk,
      warna: selectedWarna,
      finishing: selectedFinishing, // Simpan id_finishing, bukan nama
      jumlah: quantity,
      customOptions: additionalOptions.filter((option) => option.nilai), // Hanya custom yang ada nilainya
    };

    console.log("Product data sebelum submit:", productData); // Debugging

    // Panggil fungsi onSubmit dengan data yang dikumpulkan
    onSubmit(productData);

    // Reset form setelah submit
    handleCancel();
  };

  // Fungsi untuk mereset semua state ketika Cancel ditekan
  const handleCancel = () => {
    // Reset state ke nilai awal
    setNewStock(""); // Reset input stok
    setQuantity(1); // Reset jumlah ke 1
    setAdditionalOptions([{ jenis: "", nilai: "" }]); // Reset custom options
    setSelectedKain(null); // Reset pilihan kain
    setSelectedKaki(null); // Reset pilihan kaki
    setSelectedDudukan(null); // Reset pilihan dudukan
    setSelectedWarna(""); // Reset pilihan warna
    setValidationErrors({}); // Reset semua error validasi

    // Close modal
    onClose();
  };

  useEffect(() => {
    if (open) {
      setNewStock(""); // Reset input stok ketika modal dibuka
      setErrorMessage(""); // Reset pesan error
    }
  }, [open]);

  const handleStockChange = (event) => {
    setNewStock(event.target.value);
  };

  // Fungsi untuk menambahkan row custom baru
  const addAdditionalOption = () => {
    setAdditionalOptions([...additionalOptions, { jenis: "", nilai: "" }]);
  };

  // Fungsi untuk menghapus row custom tertentu
  const removeAdditionalOption = (index) => {
    const updatedOptions = additionalOptions.filter((_, i) => i !== index);
    setAdditionalOptions(updatedOptions);
  };

  // Fungsi untuk menghapus semua custom rows
  const clearAllAdditionalOptions = () => {
    setAdditionalOptions([{ jenis: "", nilai: "" }]); // Reset to one empty row
  };

  // Fungsi untuk menangani perubahan pada setiap kolom custom
  const handleAdditionalChange = useCallback(
    (index, field, value) => {
      const updatedOptions = additionalOptions.map((option, i) =>
        i === index ? { ...option, [field]: value } : option
      );
      setAdditionalOptions(updatedOptions);
    },
    [additionalOptions]
  );

  // Fungsi untuk mendapatkan opsi berdasarkan jenis yang dipilih
  const getOptionsForJenis = useCallback(
    (jenis) => {
      switch (jenis) {
        case "Kain":
          return kainAttributes.map((attr) => ({
            id: attr.id_kain,
            nama: attr.kain,
          }));
        case "Kaki":
          return kakiAttributes.map((attr) => ({
            id: attr.id_kaki,
            nama: attr.jenis_kaki,
          }));
        case "Dudukan":
          return dudukanAttributes.map((attr) => ({
            id: attr.id_dudukan,
            nama: attr.dudukan,
          }));
        default:
          return [];
      }
    },
    [kainAttributes, kakiAttributes, dudukanAttributes]
  );

  const optionsList = useMemo(() => {
    return additionalOptions.map((option) => getOptionsForJenis(option.jenis));
  }, [additionalOptions, getOptionsForJenis]);

  // Cek apakah ada custom dengan Skandinavian atau Balok Kayu, jika tidak, cek product detail
  const shouldShowFinishing = useMemo(() => {
    const customKakiOption = additionalOptions.find(
      (option) => option.jenis === "Kaki"
    );

    if (customKakiOption) {
      const customKaki = kakiAttributes.find(
        (kaki) => kaki.id_kaki === customKakiOption.nilai
      );
      return ["Skandinavian", "Balok Kayu"].includes(customKaki?.jenis_kaki);
    } else {
      return ["Skandinavian", "Balok Kayu"].includes(productDetails?.kaki);
    }
  }, [additionalOptions, productDetails, kakiAttributes]);

  if (loading) {
    return <Loading />; // Tampilkan animasi loading saat data sedang diambil
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxHeight: 700,
          width: { xs: "90%", sm: "80%", md: "600px" },
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 3,
          boxShadow: 24,
          overflowY: "auto",
        }}
      >
        <Typography id="modal-title" variant="h4" component="h2" mb={2}>
          Penerimaan Barang
        </Typography>
        <Divider />

        {/* Informasi Produk */}
        {productDetails && (
          <Box mt={2}>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label={productDetails.kategori} color="primary" />
              <Chip
                label={productDetails.subkategori}
                color="primary"
                variant="outlined"
              />
            </Stack>
            <Grid container alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h5">{productDetails.nama}</Typography>
                <Typography variant="body1">
                  <strong>SKU:</strong> {productDetails.sku}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} textAlign="left">
                <Box alignItems="center" justifyContent="center" mt={1}>
                  <Typography>Jumlah</Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    mt={1}
                  >
                    <IconButton
                      onClick={handleDecrement}
                      color="primary"
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: "4px",
                        padding: "5px",
                      }}
                    >
                      <MdRemove />
                    </IconButton>
                    <Typography variant="h6" sx={{ mx: 2 }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      onClick={handleIncrement}
                      color="primary"
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: "4px",
                        padding: "5px",
                      }}
                    >
                      <MdAdd />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Spesifikasi Detail:</Typography>
            </Box>
            <Grid container spacing={2}>
              {/* Spesifikasi Produk */}
              <Grid item size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid item size={6}>
                    <Typography variant="body2" gutterBottom>
                      Ukuran
                    </Typography>
                    {productDetails.kain && (
                      <Typography variant="body2" gutterBottom>
                        Kain
                      </Typography>
                    )}
                    {productDetails.kaki && (
                      <Typography variant="body2" gutterBottom>
                        Jenis Kaki
                      </Typography>
                    )}
                    {productDetails.dudukan && (
                      <Typography variant="body2" gutterBottom>
                        Jenis Dudukan
                      </Typography>
                    )}
                  </Grid>
                  <Grid item size={6}>
                    <Typography variant="body2" gutterBottom>
                      : {productDetails.panjang} x {productDetails.lebar} x{" "}
                      {productDetails.tinggi} cm
                    </Typography>
                    {productDetails.kain && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.kain}
                      </Typography>
                    )}
                    {productDetails.kaki && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.kaki}
                      </Typography>
                    )}
                    {productDetails.dudukan && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.dudukan}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Atribut Tambahan */}
              <Grid item size={{ xs: 12, md: 6 }}>
                <Grid container spacing={2}>
                  <Grid item size={6}>
                    {productDetails.bantal_peluk && (
                      <Typography variant="body2" gutterBottom>
                        Bantal Peluk
                      </Typography>
                    )}
                    {productDetails.bantal_sandaran && (
                      <Typography variant="body2" gutterBottom>
                        Bantal Sandaran
                      </Typography>
                    )}
                    {productDetails.kantong_remot && (
                      <Typography variant="body2" gutterBottom>
                        Kantong Remote
                      </Typography>
                    )}
                    {productDetails.puff && (
                      <Typography variant="body2" gutterBottom>
                        Puff
                      </Typography>
                    )}
                  </Grid>
                  <Grid item size={6}>
                    {productDetails.bantal_peluk && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.bantal_peluk}
                      </Typography>
                    )}
                    {productDetails.bantal_sandaran && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.bantal_sandaran}
                      </Typography>
                    )}
                    {productDetails.kantong_remot && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.kantong_remot}
                      </Typography>
                    )}
                    {productDetails.puff && (
                      <Typography variant="body2" gutterBottom>
                        : {productDetails.puff ? "Ya" : "Tidak"}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Custom Section */}
        <Box
          component="ul"
          p={1}
          m={0}
          sx={{ border: "1px solid #ccc", borderRadius: 2, mt: 1 }}
        >
          <Typography variant="subtitle1">Custom Produk</Typography>
          <Grid container spacing={1}>
            <Grid item size={5}>
              <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
                Jenis
              </Typography>
            </Grid>
            <Grid item size={5}>
              <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
                Nilai
              </Typography>
            </Grid>
            <Grid item size={2}>
              <Typography variant="subtitle1" sx={{ fontSize: "14px", mt: 1 }}>
                Hapus
              </Typography>
            </Grid>
            {additionalOptions.map((option, index) => (
              <React.Fragment key={index}>
                <Grid item size={5}>
                  <FormControl fullWidth size="small">
                    <InputLabel id={`jenis-label-${index}`}>
                      Pilih Jenis
                    </InputLabel>
                    <Select
                      labelId={`jenis-label-${index}`}
                      value={option.jenis}
                      label="Pilih Jenis"
                      onChange={(event) =>
                        handleAdditionalChange(
                          index,
                          "jenis",
                          event.target.value
                        )
                      }
                    >
                      <MenuItem value="Ukuran">Ukuran</MenuItem>
                      {productDetails?.kain && (
                        <MenuItem value="Kain">Kain</MenuItem>
                      )}
                      {productDetails?.kaki && (
                        <MenuItem value="Kaki">Kaki</MenuItem>
                      )}
                      {productDetails?.dudukan && (
                        <MenuItem value="Dudukan">Dudukan</MenuItem>
                      )}
                      {productDetails?.bantal_peluk && (
                        <MenuItem value="Bantal Peluk">Bantal Peluk</MenuItem>
                      )}
                      {productDetails?.bantal_sandaran && (
                        <MenuItem value="Bantal Sandaran">
                          Bantal Sandaran
                        </MenuItem>
                      )}
                      {productDetails?.id_jenis == 1 && (
                        <MenuItem value="Kantong Remote">
                          Kantong Remote
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item size={5}>
                  {[
                    "Ukuran",
                    "Bantal Peluk",
                    "Bantal Sandaran",
                    "Kantong Remote",
                  ].includes(option.jenis) ? (
                    <TextField
                      fullWidth
                      size="small"
                      value={option.nilai}
                      onChange={(event) =>
                        handleAdditionalChange(
                          index,
                          "nilai",
                          event.target.value
                        )
                      }
                      placeholder={`Masukkan ${option.jenis}`}
                    />
                  ) : (
                    <FormControl
                      fullWidth
                      size="small"
                      error={
                        !!validationErrors[`additionalOptions[${index}].nilai`]
                      }
                    >
                      <InputLabel id={`nilai-label-${index}`}>
                        Pilih Nilai
                      </InputLabel>
                      <Select
                        labelId={`nilai-label-${index}`}
                        value={option.nilai}
                        label="Pilih Nilai"
                        onChange={(event) =>
                          handleAdditionalChange(
                            index,
                            "nilai",
                            event.target.value
                          )
                        }
                      >
                        {optionsList[index].map((opt) => (
                          <MenuItem key={opt.id} value={opt.id}>
                            {opt.nama}
                          </MenuItem>
                        ))}
                      </Select>
                      {validationErrors[
                        `additionalOptions[${index}].nilai`
                      ] && (
                        <FormHelperText>
                          {
                            validationErrors[
                              `additionalOptions[${index}].nilai`
                            ]
                          }
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Grid>

                <Grid item size={2} display="flex">
                  <IconButton
                    onClick={() => removeAdditionalOption(index)}
                    color="error"
                    aria-label="delete"
                  >
                    <MdDelete />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>

          {/* Tombol Tambah Pilihan dan Hapus Semua */}
          <Grid container spacing={1}>
            <Grid item size={6}>
              <Button
                onClick={addAdditionalOption}
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
              >
                Tambah Pilihan
              </Button>
            </Grid>
            <Grid item size={6}>
              <Button
                onClick={clearAllAdditionalOptions}
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
              >
                Hapus Semua
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Pilihan Warna */}
          {productDetails?.id_kain && (
            <Grid item size={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Pilih Warna</InputLabel>
                <Select
                  label="Pilih Warna"
                  value={selectedWarna || ""}
                  onChange={(event) => setSelectedWarna(event.target.value)}
                >
                  {warnaOptions.length > 0 ? (
                    warnaOptions.map((warna) => (
                      <MenuItem key={warna.id_warna} value={warna.id_warna}>
                        {warna.warna}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Pilih Kain terlebih dahulu</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}

          {shouldShowFinishing && (
            <Grid item size={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Finishing</InputLabel>
                <Select
                  label="Finishing"
                  value={selectedFinishing || ""}
                  onChange={(event) => setSelectedFinishing(event.target.value)}
                >
                  {finishingOptions.length > 0 ? (
                    finishingOptions.map((finishing) => (
                      <MenuItem
                        key={finishing.id_finishing}
                        value={finishing.id_finishing}
                      >
                        {finishing.finishing}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Loading...</MenuItem> // Jika finishing belum ada
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>

        {/* Tombol Submit dan Cancel */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStockSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(StockEntryModal);
