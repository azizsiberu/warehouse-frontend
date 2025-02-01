// path: src/components/Operational/EkspedisiRekananTable.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEkspedisiRekanan,
  createNewEkspedisiRekanan,
  updateEkspedisiRekananById,
  deactivateEkspedisiRekananById,
} from "../../redux/reducers/ekspedisiRekananReducer";
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
  Modal,
  TextField,
} from "@mui/material";
import Loading from "../Loading";

const EkspedisiRekananTable = () => {
  const dispatch = useDispatch();
  const { expeditions, loading, error } = useSelector(
    (state) => state.ekspedisiRekanan
  );

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add", "edit", "delete"
  const [currentExpedition, setCurrentExpedition] = useState(null); // Data ekspedisi yang sedang diedit atau dihapus
  const [formData, setFormData] = useState({
    nama_ekspedisi: "",
    nama_pic: "",
    nomor_hp: "",
  });

  useEffect(() => {
    console.log("[EkspedisiRekananTable] Fetching ekspedisi data...");
    dispatch(fetchEkspedisiRekanan());
  }, [dispatch]);

  useEffect(() => {
    if (loading) console.log("[EkspedisiRekananTable] Loading...");
    if (error) console.error("[EkspedisiRekananTable] Error:", error);
    if (expeditions.length > 0)
      console.log("[EkspedisiRekananTable] Expeditions fetched:", expeditions);
  }, [loading, error, expeditions]);

  const handleOpenModal = (type, expedition = null) => {
    console.log(`[EkspedisiRekananTable] Opening modal for ${type}`);
    if (expedition)
      console.log("[EkspedisiRekananTable] Current expedition:", expedition);

    setModalType(type);
    setCurrentExpedition(expedition);
    setFormData({
      nama_ekspedisi: expedition?.nama_ekspedisi || "",
      nama_pic: expedition?.nama_pic || "",
      nomor_hp: expedition?.nomor_hp || "",
      is_active: true,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log("[EkspedisiRekananTable] Closing modal");
    setOpenModal(false);
    setModalType("");
    setCurrentExpedition(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(`[EkspedisiRekananTable] Form change - ${name}:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      console.log(
        "[EkspedisiRekananTable] Submitting new ekspedisi:",
        formData
      );
      dispatch(createNewEkspedisiRekanan(formData));
    } else if (modalType === "edit") {
      console.log(
        "[EkspedisiRekananTable] Updating ekspedisi:",
        currentExpedition.id,
        formData
      );
      dispatch(updateEkspedisiRekananById(currentExpedition.id, formData));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    console.log(
      "[EkspedisiRekananTable] Deleting ekspedisi:",
      currentExpedition.id
    );
    dispatch(deactivateEkspedisiRekananById(currentExpedition.id));
    handleCloseModal();
  };

  if (loading) {
    console.log("[EkspedisiRekananTable] Displaying loading spinner");
    return <Loading />;
  }

  if (error) {
    console.error("[EkspedisiRekananTable] Displaying error message:", error);
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
            Daftar Ekspedisi Rekanan
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            onClick={() => handleOpenModal("add")}
          >
            Tambah Ekspedisi
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama Ekspedisi</TableCell>
              <TableCell>Nama PIC</TableCell>
              <TableCell>Nomor HP</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expeditions.map((expedition, index) => (
              <TableRow key={expedition.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{expedition.nama_ekspedisi}</TableCell>
                <TableCell>{expedition.nama_pic}</TableCell>
                <TableCell>{expedition.nomor_hp}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenModal("edit", expedition)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleOpenModal("delete", expedition)}
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
                Apakah Anda yakin ingin menghapus ekspedisi{" "}
                {currentExpedition?.nama_ekspedisi}?
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
                {modalType === "add" ? "Tambah Ekspedisi" : "Edit Ekspedisi"}
              </Typography>
              <TextField
                fullWidth
                label="Nama Ekspedisi"
                name="nama_ekspedisi"
                value={formData.nama_ekspedisi}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Nama PIC"
                name="nama_pic"
                value={formData.nama_pic}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Nomor HP"
                name="nomor_hp"
                value={formData.nomor_hp}
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

export default EkspedisiRekananTable;
