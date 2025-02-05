import React, { useEffect, useState } from "react";
import { Box, Autocomplete, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEkspedisiRekanan,
  addEkspedisiRekanan,
} from "../../../redux/reducers/ekspedisiRekananReducer";

const ExpeditionForm = ({ onSave }) => {
  const dispatch = useDispatch();

  // Redux state
  const { expeditions, loading } = useSelector(
    (state) => state.ekspedisiRekanan
  );

  // Local State
  const [selectedExpedition, setSelectedExpedition] = useState(null); // Expedition object
  const [expeditionDetails, setExpeditionDetails] = useState({
    nama_ekspedisi: "",
    nama_pic: "",
    nomor_hp: "",
  });

  useEffect(() => {
    console.log("Fetching expeditions...");
    dispatch(fetchEkspedisiRekanan());
  }, [dispatch]);

  const handleExpeditionChange = (event, newValue) => {
    console.log("Expedition selected or entered:", newValue);

    if (newValue && typeof newValue === "object") {
      // Jika ekspedisi dipilih dari daftar
      setSelectedExpedition(newValue);
      setExpeditionDetails({
        nama_ekspedisi: newValue.nama_ekspedisi,
        nama_pic: newValue.nama_pic,
        nomor_hp: newValue.nomor_hp,
      });
      triggerChange(newValue);
    } else {
      // Jika ekspedisi baru diinput manual
      setSelectedExpedition({ nama_ekspedisi: newValue });
      setExpeditionDetails((prev) => ({
        ...prev,
        nama_ekspedisi: newValue || "",
        nama_pic: "",
        nomor_hp: "",
      }));
      triggerChange({ nama_ekspedisi: newValue });
    }
  };

  const handleExpeditionDetailsChange = (field, value) => {
    console.log(`Expedition detail updated [${field}]:`, value);
    const updatedDetails = { ...expeditionDetails, [field]: value };
    setExpeditionDetails(updatedDetails);
    triggerChange(updatedDetails);
  };

  const triggerChange = (expedition) => {
    console.log(
      "Triggering change to parent with expedition data:",
      expedition
    );
    onSave(expedition);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informasi Ekspedisi Rekanan
      </Typography>

      <Grid container spacing={1}>
        {/* Autocomplete untuk Nama Ekspedisi */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Autocomplete
            freeSolo
            size="small"
            options={expeditions || []}
            getOptionLabel={(option) => option.nama_ekspedisi || ""}
            loading={loading}
            onChange={handleExpeditionChange}
            onInputChange={(e, newValue) =>
              handleExpeditionDetailsChange("nama_ekspedisi", newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nama Ekspedisi"
                variant="outlined"
                placeholder="Masukkan atau pilih ekspedisi"
                value={expeditionDetails.nama_ekspedisi || ""}
              />
            )}
          />
        </Grid>

        {/* PIC Ekspedisi */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            label="Nama PIC Ekspedisi"
            fullWidth
            variant="outlined"
            value={expeditionDetails.nama_pic}
            onChange={(e) =>
              handleExpeditionDetailsChange("nama_pic", e.target.value)
            }
            placeholder="Masukkan nama PIC"
          />
        </Grid>

        {/* Nomor HP Ekspedisi */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            label="Nomor HP Ekspedisi"
            fullWidth
            variant="outlined"
            value={expeditionDetails.nomor_hp}
            onChange={(e) =>
              handleExpeditionDetailsChange("nomor_hp", e.target.value)
            }
            placeholder="Masukkan nomor HP"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpeditionForm;
