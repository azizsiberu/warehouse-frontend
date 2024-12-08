// path: /src/redux/reducers/overviewReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStockDistribution,
  getStockTrend,
  getRecentActivities,
  getLowStockWarning,
  getMainStats, // Import API untuk Main Stats
} from "../../services/api";

// Async thunk untuk distribusi stok
export const fetchStockDistribution = createAsyncThunk(
  "overview/fetchStockDistribution",
  async () => {
    const data = await getStockDistribution();
    return data;
  }
);

// Async thunk untuk tren stok
export const fetchStockTrend = createAsyncThunk(
  "overview/fetchStockTrend",
  async () => {
    const data = await getStockTrend();
    return data;
  }
);

// Async thunk untuk aktivitas terbaru
export const fetchRecentActivities = createAsyncThunk(
  "overview/fetchRecentActivities",
  async () => {
    const data = await getRecentActivities();
    return data;
  }
);

// Async thunk untuk peringatan stok rendah
export const fetchLowStockWarning = createAsyncThunk(
  "overview/fetchLowStockWarning",
  async () => {
    const data = await getLowStockWarning();
    return data;
  }
);

// Async thunk untuk statistik utama (Main Stats)
export const fetchMainStats = createAsyncThunk(
  "overview/fetchMainStats",
  async () => {
    const data = await getMainStats();
    return data;
  }
);

// Slice Redux
const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    mainStats: {
      total_stock: 0,
      total_warehouses: 0,
      total_products_with_stock: 0,
    },
    stockDistribution: { byLocation: [], byCategory: [] },
    stockTrend: { incoming: [], outgoing: [] },
    recentActivities: { incoming: [], outgoing: [] },
    lowStockWarning: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Main Stats
      .addCase(fetchMainStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMainStats.fulfilled, (state, action) => {
        state.mainStats = action.payload;
        state.loading = false;
      })
      .addCase(fetchMainStats.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Distribusi Stok
      .addCase(fetchStockDistribution.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockDistribution.fulfilled, (state, action) => {
        state.stockDistribution = action.payload;
        state.loading = false;
      })
      .addCase(fetchStockDistribution.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Tren Stok
      .addCase(fetchStockTrend.fulfilled, (state, action) => {
        state.stockTrend = action.payload;
      })
      // Aktivitas Terbaru
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.recentActivities = action.payload;
      })
      // Peringatan Stok Rendah
      .addCase(fetchLowStockWarning.fulfilled, (state, action) => {
        state.lowStockWarning = action.payload;
      });
  },
});

export default overviewSlice.reducer;
