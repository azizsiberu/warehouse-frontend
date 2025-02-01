//path: /src/components/Operational/TeamGudangTable.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamGudang,
  createNewTeamGudangMember,
  updateTeamGudangMemberById,
  deactivateTeamGudangMemberById,
} from "../../redux/reducers/teamGudangReducer";
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
  MenuItem,
} from "@mui/material";
import Loading from "../Loading";

const TeamGudangTable = () => {
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector((state) => state.teamGudang);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "add", "edit", "delete"
  const [currentMember, setCurrentMember] = useState(null); // Untuk data yang akan diedit/dihapus

  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "Driver", // Default value
  });

  useEffect(() => {
    console.log("[TeamGudangTable] Mounting component and fetching data...");
    dispatch(fetchTeamGudang());
  }, [dispatch]);

  useEffect(() => {
    if (loading) console.log("[TeamGudangTable] Loading...");
    if (error) console.error("[TeamGudangTable] Error:", error);
    if (members.length > 0)
      console.log("[TeamGudangTable] Members fetched:", members);
  }, [loading, error, members]);

  const handleOpenModal = (type, member = null) => {
    console.log(`[TeamGudangTable] Opening modal for ${type}`);
    if (member) console.log("[TeamGudangTable] Current member:", member);

    setModalType(type);
    setCurrentMember(member);
    setFormData({
      nama: member?.nama || "",
      jabatan: member?.jabatan || "Driver",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log("[TeamGudangTable] Closing modal");
    setOpenModal(false);
    setModalType("");
    setCurrentMember(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(`[TeamGudangTable] Form change - ${name}:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (modalType === "add") {
      console.log("[TeamGudangTable] Submitting new member:", formData);
      dispatch(
        createNewTeamGudangMember({
          ...formData,
          is_active: true,
        })
      );
    } else if (modalType === "edit") {
      console.log(
        "[TeamGudangTable] Updating member:",
        currentMember.id,
        formData
      );
      dispatch(updateTeamGudangMemberById(currentMember.id, formData));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    console.log("[TeamGudangTable] Deleting member:", currentMember.id);
    dispatch(deactivateTeamGudangMemberById(currentMember.id));
    handleCloseModal();
  };

  if (loading) {
    console.log("[TeamGudangTable] Displaying loading spinner");
    return <Loading />;
  }

  if (error) {
    console.error("[TeamGudangTable] Displaying error message:", error);
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
            Daftar Tim Gudang
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 2 }}
            onClick={() => handleOpenModal("add")}
          >
            Tambah Anggota
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Jabatan</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{member.nama}</TableCell>
                <TableCell>{member.jabatan}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenModal("edit", member)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleOpenModal("delete", member)}
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
                Apakah Anda yakin ingin menghapus {currentMember?.nama}?
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
                {modalType === "add" ? "Tambah Anggota" : "Edit Anggota"}
              </Typography>
              <TextField
                fullWidth
                label="Nama"
                name="nama"
                value={formData.nama}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              />
              <TextField
                select
                fullWidth
                label="Jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleFormChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Driver">Driver</MenuItem>
                <MenuItem value="Partner">Partner</MenuItem>
                <MenuItem value="Packing">Packing</MenuItem>
                <MenuItem value="Lainnya">Lainnya</MenuItem>
              </TextField>
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

export default TeamGudangTable;
