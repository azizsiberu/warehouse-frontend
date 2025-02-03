// path: src/components/ScheduleManagement/FinalScheduleDrawer.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchFinalScheduleById } from "../../redux/reducers/scheduleReducer";

const FinalScheduleDrawer = ({ open, onClose, scheduleId }) => {
  const dispatch = useDispatch();
  const scheduleDetail = useSelector((state) => state.schedules.scheduleDetail);
  const loading = useSelector((state) => state.schedules.loadingDetail);

  // Fetch schedule details when the drawer opens
  useEffect(() => {
    if (open && scheduleId) {
      dispatch(fetchFinalScheduleById(scheduleId));
    }
  }, [open, scheduleId, dispatch]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Detail Jadwal Akhir</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : scheduleDetail ? (
          <Box>
            <Typography variant="subtitle1">
              <strong>Sales:</strong> {scheduleDetail.sales}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Pelanggan:</strong> {scheduleDetail.pelanggan}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Lokasi:</strong> {scheduleDetail.lokasi}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Produk:</strong> {scheduleDetail.nama_produk}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Tanggal Pengiriman:</strong>{" "}
              {new Date(scheduleDetail.tanggal_pengiriman).toLocaleDateString(
                "id-ID"
              )}
            </Typography>
          </Box>
        ) : (
          <Typography align="center">Data tidak ditemukan</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default FinalScheduleDrawer;
