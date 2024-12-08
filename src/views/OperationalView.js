// path: src/views/OperationalView.js
import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Import Grid versi 6
import TeamGudangTable from "../components/Operational/TeamGudangTable";
import KendaraanTable from "../components/Operational/KendaraanTable";
import EkspedisiRekananTable from "../components/Operational/EkspedisiRekananTable";
import WarehouseTable from "../components/Operational/WarehouseTable";

const OperationalView = ({ setPageTitle }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const title = "Manajemen Operasional";
    setPageTitle(title);
    document.title = title;
  }, [setPageTitle]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <TeamGudangTable />;
      case 1:
        return <KendaraanTable />;
      case 2:
        return <EkspedisiRekananTable />;
      case 3:
        return <WarehouseTable />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Hi, di halaman ini Anda bisa menambahkan tim gudang, kendaraan,
        ekspedisi rekanan, dan melihat nama gudang.
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ marginBottom: 2 }}
        aria-label="Operational tabs"
      >
        <Tab label="Tim Gudang" />
        <Tab label="Kendaraan" />
        <Tab label="Ekspedisi Rekanan" />
        <Tab label="Gudang" />
      </Tabs>

      <Grid container spacing={2}>
        <Grid size={12}>{renderActiveTab()}</Grid>
      </Grid>
    </Box>
  );
};

export default OperationalView;
