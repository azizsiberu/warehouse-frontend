// path: src/components/ScheduleManagement/Details/index.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScheduleById } from "../../../services/api";
import ScheduleDetailHeader from "./ScheduleDetailHeader";
import ProductList from "./ProductList";
import { Box, CircularProgress, Typography } from "@mui/material";

const ScheduleDetailIndex = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data jadwal berdasarkan ID
  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const data = await getScheduleById(id);
        setSchedule(data);
      } catch (error) {
        setError("Failed to fetch schedule details.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetails();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <ScheduleDetailHeader schedule={schedule} />
      <ProductList scheduleDetails={schedule} />
    </Box>
  );
};

export default ScheduleDetailIndex;
