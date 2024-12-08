// path: src/components/Operational/KendaraanTable.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchKendaraan,
  createNewKendaraan,
  updateKendaraanById,
  deactivateKendaraanById,
} from "../../redux/reducers/kendaraanReducer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";

const KendaraanTable = () => {
  const dispatch = useDispatch();
  const { kendaraan, loading, error } = useSelector((state) => state.kendaraan);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add", "edit", "delete"
  const [currentVehicle, setCurrentVehicle] = useState(null); // Data kendaraan yang sedang diedit atau dihapus
  const [formData, setFormData] = useState({
    nomor_polisi: "",
    jenis_kendaraan: "",
  });

  useEffect(() => {
    console.log("[KendaraanTable] Fetching kendaraan data...");
    dispatch(fetchKendaraan());
  }, [dispatch]);

  useEffect(() => {
    if (loading) console.log("[KendaraanTable] Loading...");
    if (error) console.error("[KendaraanTable] Error:", error);
    if (kendaraan.length > 0)
      console.log("[KendaraanTable] Kendaraan fetched:", kendaraan);
  }, [loading, error, kendaraan]);

  const handleOpenModal = (type, vehicle = null) => {
    console.log(`[KendaraanTable] Opening modal for ${type}`);
    if (vehicle) console.log("[KendaraanTable] Current vehicle:", vehicle);

    setModalType(type);
    setCurrentVehicle(vehicle);
    setFormData({
      nomor_polisi: vehicle?.nomor_polisi || "",
      jenis_kendaraan: vehicle?.jenis_kendaraan || "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log("[KendaraanTable] Closing modal");
    setOpenModal(false);
    setModalType("");
    setCurrentVehicle(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(`[KendaraanTable] Form change - ${name}:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      console.log("[KendaraanTable] Submitting new kendaraan:", formData);
      dispatch(createNewKendaraan(formData));
    } else if (modalType === "edit") {
      console.log(
        "[KendaraanTable] Updating kendaraan:",
        currentVehicle.id,
        formData
      );
      dispatch(updateKendaraanById(currentVehicle.id, formData));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    console.log("[KendaraanTable] Deleting kendaraan:", currentVehicle.id);
    dispatch(deactivateKendaraanById(currentVehicle.id));
    handleCloseModal();
  };

  if (loading) {
    console.log("[KendaraanTable] Displaying loading spinner");
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error("[KendaraanTable] Displaying error message:", error);
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography variant="h6" color="error">
          {`Error: ${error}`}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Daftar Kendaraan
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            onClick={() => handleOpenModal("add")}
          >
            Tambah Kendaraan
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nomor Polisi</TableCell>
              <TableCell>Jenis Kendaraan</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kendaraan.map((vehicle, index) => (
              <TableRow key={vehicle.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{vehicle.nomor_polisi}</TableCell>
                <TableCell>{vehicle.jenis_kendaraan}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenModal("edit", vehicle)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleOpenModal("delete", vehicle)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {modalType === "delete" ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Konfirmasi Hapus
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Apakah Anda yakin ingin menghapus kendaraan dengan nomor polisi{" "}
                {currentVehicle?.nomor_polisi}?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{ mr: 1 }}
                >
                  Hapus
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Batal
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {modalType === "add" ? "Tambah Kendaraan" : "Edit Kendaraan"}
              </Typography>
              <TextField
                fullWidth
                label="Nomor Polisi"
                name="nomor_polisi"
                value={formData.nomor_polisi}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Jenis Kendaraan"
                name="jenis_kendaraan"
                value={formData.jenis_kendaraan}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ mr: 1 }}
                >
                  Simpan
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Batal
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default KendaraanTable;
