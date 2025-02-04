// path: src/components/ScheduleManagement/FinalConfirmation/FinalConfirmationHeader.js
import React, { useEffect } from "react";
import { Typography, Box, Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const FinalConfirmationHeader = ({ schedule }) => {
  // 🔍 Log debugging
  useEffect(() => {
    console.log("📌 [FinalConfirmationHeader] Data Jadwal:", schedule);
  }, [schedule]);

  // 🔧 Mencegah ResizeObserver Loop
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }, []);

  // Fungsi untuk format tanggal ke format yg mudah dibaca
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="body2">Nama Sales</Typography>
              <Typography variant="body2">Nama Pelanggan</Typography>
              <Typography variant="body2">No HP</Typography>
              <Typography variant="body2">Tanggal</Typography>
            </Box>

            <Box>
              <Typography variant="body2">: {schedule?.sales_name}</Typography>
              <Typography variant="body2">
                : {schedule?.nama_pelanggan}
              </Typography>
              <Typography variant="body2">: {schedule?.nomor_hp}</Typography>
              <Typography variant="body2">
                : {formatDate(schedule?.tanggal_pengiriman)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
          >
            <Box sx={{ width: "100%" }}>
              <TextField
                value={capitalizeWords(
                  `${schedule?.alamat_pelanggan || ""}, ${
                    schedule?.kelurahan || ""
                  }, ${schedule?.kecamatan || ""}, ${
                    schedule?.kabupaten || ""
                  }, ${schedule?.provinsi || ""}`
                )}
                multiline
                size="small"
                rows={4}
                fullWidth
                label="Alamat"
                InputProps={{ readOnly: true }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default FinalConfirmationHeader;
