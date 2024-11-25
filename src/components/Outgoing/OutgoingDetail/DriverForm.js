// path: /src/components/Outgoing/OutgoingDetail/DriverForm.js
import React, { useEffect, useState } from "react";
import { Box, Autocomplete, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamGudang } from "../../../redux/reducers/teamGudangReducer";
import {
  fetchKendaraan,
  createNewKendaraan,
} from "../../../redux/reducers/kendaraanReducer";

const DriverForm = ({ onChange }) => {
  const dispatch = useDispatch();

  // State dari Redux
  const { members, loading: loadingGudang } = useSelector(
    (state) => state.teamGudang
  );
  const { kendaraan, loading: loadingKendaraan } = useSelector(
    (state) => state.kendaraan
  );

  // Local State
  const [driverField, setDriverField] = useState(null); // Field untuk Driver
  const [partnerFields, setPartnerFields] = useState([""]); // Array field partner
  const [vehicleField, setVehicleField] = useState(null); // Field untuk Kendaraan
  const [vehicleDetails, setVehicleDetails] = useState({
    nomor_polisi: "",
    jenis_kendaraan: "",
  });

  useEffect(() => {
    // Panggil Redux thunk untuk mendapatkan data team_gudang dan kendaraan
    dispatch(fetchTeamGudang());
    dispatch(fetchKendaraan());
  }, [dispatch]);

  // Handle perubahan Driver
  const handleDriverChange = (event, newValue) => {
    setDriverField(newValue);
    triggerChange(newValue, partnerFields, vehicleField);
  };

  // Handle perubahan di tiap field partner
  const handlePartnerInputChange = (index, inputValue) => {
    const updatedPartners = [...partnerFields];
    updatedPartners[index] = inputValue;

    // Jika field terakhir terisi, tambahkan field kosong baru
    if (index === partnerFields.length - 1 && inputValue.trim() !== "") {
      updatedPartners.push("");
    }

    setPartnerFields(updatedPartners);
    triggerChange(driverField, updatedPartners, vehicleField);
  };

  // Handle input kendaraan baru
  const handleVehicleInputChange = (field, value) => {
    setVehicleDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Simpan kendaraan baru ke backend
  const saveNewVehicle = async () => {
    if (!vehicleDetails.nomor_polisi || !vehicleDetails.jenis_kendaraan) {
      alert("Nomor Polisi dan Jenis Kendaraan harus diisi!");
      return;
    }

    try {
      const newVehicle = await dispatch(
        createNewKendaraan(vehicleDetails)
      ).unwrap();
      setVehicleField(newVehicle); // Pilih kendaraan baru
      triggerChange(driverField, partnerFields, newVehicle);
      alert("Kendaraan baru berhasil ditambahkan!");
    } catch (error) {
      console.error("Error saving new vehicle:", error);
      alert("Gagal menambahkan kendaraan baru.");
    }
  };

  // Memicu perubahan ke parent
  const triggerChange = (driver, partners, vehicle) => {
    onChange({
      driver,
      partners: partners.filter((partner) => partner.trim() !== ""), // Hapus field kosong
      vehicle,
    });
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {/* Driver Field */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            options={members || []}
            getOptionLabel={(option) => option.nama || ""}
            loading={loadingGudang}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nama Driver"
                variant="outlined"
                placeholder="Pilih atau tambahkan driver"
              />
            )}
            value={driverField}
            onChange={handleDriverChange}
          />
        </Grid>

        {/* Partner Fields */}
        {partnerFields.map((partner, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Autocomplete
              freeSolo
              options={members || []}
              getOptionLabel={(option) => option.nama || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Partner ${index + 1}`}
                  variant="outlined"
                  placeholder="Masukkan atau pilih partner"
                />
              )}
              inputValue={partnerFields[index] || ""}
              onInputChange={(event, newInputValue) =>
                handlePartnerInputChange(index, newInputValue)
              }
            />
          </Grid>
        ))}
      </Grid>
      {/* Kendaraan Field */}

      <Grid container spacing={1}>
        <Grid size={12}>
          <Typography variant="h6">Kendaraan</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Nomor Polisi"
            variant="outlined"
            fullWidth
            value={vehicleDetails.nomor_polisi}
            onChange={(e) =>
              handleVehicleInputChange("nomor_polisi", e.target.value)
            }
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Jenis Kendaraan"
            variant="outlined"
            fullWidth
            value={vehicleDetails.jenis_kendaraan}
            onChange={(e) =>
              handleVehicleInputChange("jenis_kendaraan", e.target.value)
            }
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DriverForm;
