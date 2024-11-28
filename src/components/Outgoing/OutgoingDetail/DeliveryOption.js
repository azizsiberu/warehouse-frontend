// path: /src/components/Outgoing/OutgoingDetail/DeliveryOption.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import DriverForm from "./DriverForm";
import ExpeditionForm from "./ExpeditionForm";

const DeliveryOption = ({ onSave }) => {
  const [selectedOption, setSelectedOption] = useState(""); // "kurirSendiri" or "ekspedisiRekanan"
  const [driverData, setDriverData] = useState(null); // Data dari DriverForm
  const [expeditionData, setExpeditionData] = useState(null); // Data dari ExpeditionForm

  const handleOptionChange = (event) => {
    const value = event.target.value;
    console.log("Delivery option selected:", value);

    setSelectedOption(value);

    // Reset data saat opsi berubah
    if (value === "kurirSendiri") {
      setExpeditionData(null); // Hapus data ekspedisi jika beralih ke Kurir Sendiri
      onSave({ type: value, data: driverData });
    } else if (value === "ekspedisiRekanan") {
      setDriverData(null); // Hapus data kurir jika beralih ke Ekspedisi Rekanan
      onSave({ type: value, data: expeditionData });
    }
  };

  const handleDriverSave = (data) => {
    console.log("Driver Data Saved:", data);
    setDriverData(data); // Simpan data driver di state
    onSave({ type: "kurirSendiri", data }); // Kirim data ke parent
  };

  const handleExpeditionSave = (data) => {
    console.log("Expedition Data Saved:", data);
    setExpeditionData(data); // Simpan data ekspedisi di state
    onSave({ type: "ekspedisiRekanan", data }); // Kirim data ke parent
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Pilih Opsi Pengiriman
      </Typography>
      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{ mb: 3 }}
      >
        <FormControlLabel
          value="kurirSendiri"
          control={<Radio />}
          label="Kurir Sendiri"
        />
        <FormControlLabel
          value="ekspedisiRekanan"
          control={<Radio />}
          label="Ekspedisi Rekanan"
        />
      </RadioGroup>

      {/* Form untuk Kurir Sendiri */}
      {selectedOption === "kurirSendiri" && (
        <DriverForm onSave={handleDriverSave} />
      )}

      {/* Form untuk Ekspedisi Rekanan */}
      {selectedOption === "ekspedisiRekanan" && (
        <ExpeditionForm onSave={handleExpeditionSave} />
      )}
    </Box>
  );
};

export default DeliveryOption;
