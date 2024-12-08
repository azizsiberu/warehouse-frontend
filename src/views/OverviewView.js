// path: src/views/OverviewView.js
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMainStats,
  fetchStockDistribution,
  fetchStockTrend,
  fetchRecentActivities,
  fetchLowStockWarning,
} from "../redux/reducers/overviewReducer";
import {
  OverviewStats,
  RecentActivities,
  LowStockWarning,
} from "../components/Overview";
import OverviewCharts from "../components/Overview/OverviewCharts";
import Loading from "../components/Loading";

const OverviewView = ({ setPageTitle }) => {
  const dispatch = useDispatch();

  // Redux state
  const {
    mainStats,
    stockDistribution,
    stockTrend,
    recentActivities,
    lowStockWarning,
    loading,
    error,
  } = useSelector((state) => state.overview);

  useEffect(() => {
    const title = "Overview";
    setPageTitle(title);
    document.title = title;

    // Fetch data
    dispatch(fetchMainStats());
    dispatch(fetchStockDistribution());
    dispatch(fetchStockTrend());
    dispatch(fetchRecentActivities());
    dispatch(fetchLowStockWarning());
  }, [dispatch, setPageTitle]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ringkasan Stok
      </Typography>

      <Grid container spacing={3}>
        <Grid size={12}>
          <OverviewStats stats={mainStats} />
        </Grid>
        <Grid size={12}>
          <OverviewCharts distribution={stockDistribution} trend={stockTrend} />
        </Grid>
        <Grid size={6}>
          <RecentActivities activities={recentActivities} />
        </Grid>
        <Grid size={6}>
          <LowStockWarning lowStock={lowStockWarning} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewView;
