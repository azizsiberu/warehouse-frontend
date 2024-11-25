// path: /src/components/Outgoing/OutgoingDetail/ExpeditionForm.js
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEkspedisiRekanan,
  addEkspedisiRekanan,
} from "../../../redux/reducers/ekspedisiRekananReducer";

const ExpeditionForm = ({ onSave }) => {
  const dispatch = useDispatch();
  const { expeditions, loading } = useSelector(
    (state) => state.ekspedisiRekanan
  );

  const [selectedExpedition, setSelectedExpedition] = useState(null);
  const [expeditionName, setExpeditionName] = useState("");
  const [expeditionPic, setExpeditionPic] = useState("");
  const [expeditionPhone, setExpeditionPhone] = useState("");

  useEffect(() => {
    // Panggil Redux thunk untuk mendapatkan data ekspedisi_rekanan
    dispatch(fetchEkspedisiRekanan());
  }, [dispatch]);

  const handleExpeditionChange = (event, newValue) => {
    const selected = expeditions.find((exp) => exp.nama_ekspedisi === newValue);
    setSelectedExpedition(selected || null);
    setExpeditionName(selected?.nama_ekspedisi || newValue);
    setExpeditionPic(selected?.nama_pic || "");
    setExpeditionPhone(selected?.nomor_hp || "");
  };

  const handleSave = () => {
    const data = selectedExpedition
      ? selectedExpedition
      : {
          nama_ekspedisi: expeditionName,
          nama_pic: expeditionPic,
          nomor_hp: expeditionPhone,
        };

    if (!data.nama_ekspedisi || !data.nama_pic || !data.nomor_hp) {
      alert("Nama ekspedisi, PIC, dan nomor HP harus diisi.");
      return;
    }

    if (!selectedExpedition) {
      // Jika ekspedisi baru, tambahkan melalui Redux
      dispatch(addEkspedisiRekanan(data));
    }

    onSave(data);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informasi Ekspedisi Rekanan
      </Typography>

      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Autocomplete untuk Nama Ekspedisi */}
          <Autocomplete
            freeSolo
            value={expeditionName}
            onChange={handleExpeditionChange}
            options={expeditions.map((expedition) => expedition.nama_ekspedisi)}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nama Ekspedisi"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Nama PIC Ekspedisi"
            fullWidth
            value={expeditionPic}
            onChange={(e) => setExpeditionPic(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Nomor HP Ekspedisi"
            fullWidth
            value={expeditionPhone}
            onChange={(e) => setExpeditionPhone(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Simpan
      </Button>
    </Box>
  );
};

export default ExpeditionForm;
