// path: src/views/StockManagementView.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFinalStocks,
  fetchWarehouses,
} from "../redux/reducers/stockManagementReducer";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Filters from "../components/StockManagement/Filters";
import StockTable from "../components/StockManagement/StockTable";
import Loading from "../components/Loading";

const StockManagementView = ({ setPageTitle }) => {
  const dispatch = useDispatch();
  const { finalStocks, warehouses, loading, error } = useSelector(
    (state) => state.stockManagement
  );

  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    const title = "Manajemen Stok";
    setPageTitle(title);
    document.title = title;

    dispatch(fetchFinalStocks());
    dispatch(fetchWarehouses());
  }, [dispatch]);

  useEffect(() => {
    if (finalStocks.length > 0) {
      console.log("📦 [FETCH DATA] Final Stocks:", finalStocks);
    }
    if (warehouses.length > 0) {
      console.log("🏢 [FETCH DATA] Warehouses:", warehouses);
    }
  }, [finalStocks, warehouses]);

  if (loading) {
    return <Loading />;
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
