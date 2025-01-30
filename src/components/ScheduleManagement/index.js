// src/components/ScheduleManagement/index.js

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TableFinal from "./TableFinal";
import TableTemporary from "./TableTemporary";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ScheduleManagement = () => {
  // State untuk menyimpan tab yang aktif
  const [activeTab, setActiveTab] = useState("temporary");

  // Fungsi untuk mengganti tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          size={2}
          sx={{
            position: "sticky", // Make the sidebar sticky
            top: 15, // Keep it at the top of the screen
            height: "90vh", // Make the sidebar stretch the full height of the viewport
            overflowY: "auto", // Ensure the sidebar is scrollable if its content exceeds the height
          }}
        >
          {" "}
          {/* Pass activeTab and handleTabChange to Sidebar */}
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        </Grid>
        <Grid size={10}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {/* Conditionally render the tables based on the activeTab */}
            {activeTab === "temporary" && <TableTemporary />}
            {activeTab === "final" && <TableFinal />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleManagement;
