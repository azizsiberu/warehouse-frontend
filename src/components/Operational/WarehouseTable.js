// path: src/components/Operational/WarehouseTable.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWarehouses } from "../../redux/reducers/warehouseReducer";
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

const WarehouseTable = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector(
    (state) => state.warehouses
  );

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add" atau "edit"
  const [currentWarehouse, setCurrentWarehouse] = useState(null); // Data gudang yang sedang diedit
  const [formData, setFormData] = useState({
    lokasi: "",
  });

  useEffect(() => {
    dispatch(fetchWarehouses()); // Fetch data gudang saat komponen dimuat
  }, [dispatch]);

  const handleOpenModal = (type, warehouse = null) => {
    setModalType(type);
    setCurrentWarehouse(warehouse);
    setFormData({
      lokasi: warehouse?.lokasi || "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType("");
    setCurrentWarehouse(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      console.log("[WarehouseTable] Adding new warehouse:", formData);
      // Dispatch action untuk menambah gudang baru
    } else if (modalType === "edit") {
      console.log(
        "[WarehouseTable] Updating warehouse:",
        currentWarehouse.id,
        formData
      );
      // Dispatch action untuk memperbarui data gudang
    }
    handleCloseModal();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
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
            Daftar Gudang
          </Typography>
          <Button
            disabled
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            onClick={() => handleOpenModal("add")}
          >
            Tambah Gudang
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location, index) => (
              <TableRow key={location.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{location.lokasi}</TableCell>
                <TableCell align="center">
                  <Button
                    disabled
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenModal("edit", location)}
                  >
                    Edit
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
          <Typography variant="h6" sx={{ mb: 2 }}>
            {modalType === "add" ? "Tambah Gudang" : "Edit Gudang"}
          </Typography>
          <TextField
            fullWidth
            label="Lokasi"
            name="lokasi"
            value={formData.lokasi}
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
        </Box>
      </Modal>
    </>
  );
};

export default WarehouseTable;
