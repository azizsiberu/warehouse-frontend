// path: src/views/StockManagementView.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFinalStocks,
  fetchWarehouses,
} from "../redux/reducers/stockManagementReducer";
import { Box, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Filters from "../components/StockManagement/Filters";
import StockTable from "../components/StockManagement/StockTable";

const StockManagementView = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const { finalStocks, warehouses, loading, error } = useSelector(
    (state) => state.stockManagement
  );

  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    dispatch(fetchFinalStocks());
    dispatch(fetchWarehouses());
  }, [dispatch]);

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
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {`Error: ${error}`}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Filters Section */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Filters
            warehouses={warehouses}
            stocks={finalStocks}
            onFilterChange={setFilteredStocks} // Terima hasil filter
          />
        </Grid>

        {/* Stock Table Section */}
        <Grid size={{ xs: 12, md: 9 }}>
          <StockTable stocks={filteredStocks} loading={false} error={null} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockManagementView;
