// path: /src/components/Outgoing/OutgoingDetail/DriverForm.js

import React, { useEffect, useState } from "react";
import { Box, Autocomplete, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamGudang } from "../../../redux/reducers/teamGudangReducer";
import { fetchKendaraan } from "../../../redux/reducers/kendaraanReducer";

const DriverForm = ({ onSave }) => {
  const dispatch = useDispatch();

  const { members, loading: loadingGudang } = useSelector(
    (state) => state.teamGudang
  );
  const { kendaraan, loading: loadingKendaraan } = useSelector(
    (state) => state.kendaraan
  );

  const [driverField, setDriverField] = useState(null);
  const [partnerFields, setPartnerFields] = useState([{ nama: "", id: null }]); // Array of objects
  const [vehicleDetails, setVehicleDetails] = useState({
    nomor_polisi: "",
    jenis_kendaraan: "",
  });

  useEffect(() => {
    dispatch(fetchTeamGudang());
    dispatch(fetchKendaraan());
  }, [dispatch]);

  const handleDriverChange = (event, newValue) => {
    let updatedDriver = null;

    if (newValue && typeof newValue === "object") {
      console.log("Driver selected from database:", newValue);
      updatedDriver = newValue;
    } else if (typeof newValue === "string" && newValue.trim() !== "") {
      console.log("Driver input manually:", newValue);
      updatedDriver = { nama: newValue.trim(), id: null };
    }

    setDriverField(updatedDriver || null);
    triggerSave(updatedDriver, partnerFields, vehicleDetails);
  };

  // Tambahkan logika untuk menangani input manual driver
  const handleDriverInputChange = (event, newValue) => {
    if (typeof newValue === "string") {
      const updatedDriver = { nama: newValue.trim(), id: null };
      setDriverField(updatedDriver);
      triggerSave(updatedDriver, partnerFields, vehicleDetails);
    }
  };

  const handlePartnerInputChange = (index, event, newValue) => {
    const updatedPartners = [...partnerFields];

    if (newValue && typeof newValue === "object" && newValue.id) {
      console.log("Partner selected from database:", newValue);
      updatedPartners[index] = newValue;
    } else if (typeof newValue === "string" && newValue.trim() !== "") {
      console.log("Partner input manually:", newValue);
      updatedPartners[index] = { nama: newValue.trim(), id: null };
    } else {
      updatedPartners[index] = { nama: "", id: null }; // Kosongkan field jika input dihapus
    }

    if (
      index === partnerFields.length - 1 &&
      updatedPartners[index].nama?.trim() &&
      !updatedPartners[index + 1]
    ) {
      updatedPartners.push({ nama: "", id: null });
    }

    setPartnerFields(updatedPartners);
    triggerSave(driverField, updatedPartners, vehicleDetails);
  };

  // Tambahkan logika untuk menangani input manual partner
  const handlePartnerInputManual = (index, event, newValue) => {
    const updatedPartners = [...partnerFields];

    if (typeof newValue === "string" && newValue.trim() !== "") {
      updatedPartners[index] = { nama: newValue.trim(), id: null };
    } else {
      updatedPartners[index] = { nama: "", id: null };
    }

    // Tambahkan field baru jika field terakhir diisi
    if (
      index === updatedPartners.length - 1 &&
      updatedPartners[index].nama?.trim()
    ) {
      updatedPartners.push({ nama: "", id: null });
    }

    setPartnerFields(updatedPartners);
    triggerSave(driverField, updatedPartners, vehicleDetails);
  };
  const handleVehicleDetailsChange = (field, value) => {
    const updatedVehicleDetails = { ...vehicleDetails, [field]: value };
    console.log(`Vehicle detail updated [${field}]:`, value);
    setVehicleDetails(updatedVehicleDetails);
    triggerSave(driverField, partnerFields, updatedVehicleDetails);
  };

  const triggerSave = (driver, partners, vehicle) => {
    const validDriver = driver?.nama?.trim() ? driver : null;
    const validPartners = partners.filter((partner) => partner.nama?.trim());
    const data = {
      driver: validDriver,
      partners: validPartners,
      vehicle,
    };

    console.log("Triggering save to parent with data:", data);
    onSave(data);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Informasi Driver dan Kendaraan
      </Typography>
      <Grid container spacing={1}>
        {/* Driver Field */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            freeSolo
            options={members || []}
            getOptionLabel={(option) => option.nama || ""}
            loading={loadingGudang}
            value={driverField}
            onChange={handleDriverChange}
            onInputChange={handleDriverInputChange} // Tambahkan ini
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nama Driver"
                variant="outlined"
                placeholder="Pilih atau tambahkan driver"
              />
            )}
          />
        </Grid>

        {/* Partner Fields */}
        {partnerFields.map((partner, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Autocomplete
              freeSolo
              options={members || []}
              getOptionLabel={(option) => option.nama || ""}
              loading={loadingGudang}
              value={partnerFields[index]}
              onChange={(event, newValue) =>
                handlePartnerInputChange(index, event, newValue)
              }
              onInputChange={
                (event, newValue) =>
                  handlePartnerInputManual(index, event, newValue) // Tambahkan ini
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Partner ${index + 1}`}
                  variant="outlined"
                  placeholder="Masukkan atau pilih partner"
                />
              )}
            />
          </Grid>
        ))}
      </Grid>

      {/* Vehicle Fields */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Kendaraan
      </Typography>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            freeSolo
            options={kendaraan || []}
            getOptionLabel={(option) =>
              typeof option === "object" ? option.nomor_polisi : option
            }
            loading={loadingKendaraan}
            value={vehicleDetails.nomor_polisi || ""}
            onInputChange={(event, newValue) => {
              // Jika input manual, perbarui state
              if (typeof newValue === "string") {
                setVehicleDetails((prev) => ({
                  ...prev,
                  nomor_polisi: newValue,
                }));
                triggerSave(driverField, partnerFields, {
                  ...vehicleDetails,
                  nomor_polisi: newValue,
                });
              }
            }}
            onChange={(event, newValue) => {
              if (newValue && typeof newValue === "object") {
                // Jika dipilih dari daftar, update dengan data lengkap
                setVehicleDetails({
                  nomor_polisi: newValue.nomor_polisi,
                  jenis_kendaraan: newValue.jenis_kendaraan,
                });
                triggerSave(driverField, partnerFields, {
                  nomor_polisi: newValue.nomor_polisi,
                  jenis_kendaraan: newValue.jenis_kendaraan,
                });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nomor Polisi"
                variant="outlined"
                placeholder="Masukkan atau pilih nomor polisi"
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            freeSolo
            options={kendaraan || []}
            getOptionLabel={(option) =>
              typeof option === "object" ? option.jenis_kendaraan : option
            }
            loading={loadingKendaraan}
            value={vehicleDetails.jenis_kendaraan || ""}
            onInputChange={(event, newValue) => {
              // Jika input manual, perbarui state
              if (typeof newValue === "string") {
                setVehicleDetails((prev) => ({
                  ...prev,
                  jenis_kendaraan: newValue,
                }));
                triggerSave(driverField, partnerFields, {
                  ...vehicleDetails,
                  jenis_kendaraan: newValue,
                });
              }
            }}
            onChange={(event, newValue) => {
              if (newValue && typeof newValue === "object") {
                // Jika dipilih dari daftar, update dengan data lengkap
                setVehicleDetails({
                  nomor_polisi: newValue.nomor_polisi,
                  jenis_kendaraan: newValue.jenis_kendaraan,
                });
                triggerSave(driverField, partnerFields, {
                  nomor_polisi: newValue.nomor_polisi,
                  jenis_kendaraan: newValue.jenis_kendaraan,
                });
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Jenis Kendaraan"
                variant="outlined"
                placeholder="Masukkan atau pilih jenis kendaraan"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DriverForm;
