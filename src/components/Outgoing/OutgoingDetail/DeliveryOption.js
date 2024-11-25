// path: /src/components/Outgoing/OutgoingDetail/DeliveryOption.js

import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import DriverForm from "./DriverForm";
import ExpeditionForm from "./ExpeditionForm";

const DeliveryOption = ({ onSave }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [deliveryData, setDeliveryData] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setDeliveryData(null); // Reset delivery data when the option changes
  };

  const handleSaveDriver = (data) => {
    setDeliveryData({ type: "kurirSendiri", ...data });
  };

  const handleDriverChange = (data) => {
    console.log("Driver and Partners data updated:", data);
  };

  const handleSaveExpedition = (data) => {
    setDeliveryData({ type: "ekspedisiRekanan", ...data });
  };

  const handleFinalSave = () => {
    if (!deliveryData) {
      alert("Harap lengkapi informasi pengiriman.");
      return;
    }
    onSave(deliveryData);
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

      {selectedOption === "kurirSendiri" && (
        <DriverForm onChange={handleDriverChange} />
      )}
      {selectedOption === "ekspedisiRekanan" && (
        <ExpeditionForm onSave={handleSaveExpedition} />
      )}
    </Box>
  );
};

export default DeliveryOption;
