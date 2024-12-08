// path: /src/redux/reducers/stockManagementReducer.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getStockTransactions,
  getAllFinalStock,
  getWarehouses,
} from "../../services/api";

// Thunks
export const fetchStockTransactions = createAsyncThunk(
  "stockManagement/fetchStockTransactions",
  async ({ productId, warehouseId = null }) => {
    const data = await getStockTransactions(productId, warehouseId);
    return data;
  }
);

export const fetchFinalStocks = createAsyncThunk(
  "stockManagement/fetchFinalStocks",
  async () => {
    const data = await getAllFinalStock();
    return data;
  }
);

export const fetchWarehouses = createAsyncThunk(
  "stockManagement/fetchWarehouses",
  async () => {
    const data = await getWarehouses();
    return data;
  }
);

// Initial state
const initialState = {
  transactions: [],
  finalStocks: [],
  warehouses: [],
  loading: false,
  error: null,
};

// Slice
const stockManagementSlice = createSlice({
  name: "stockManagement",
  initialState,
  reducers: {
    resetState: (state) => {
      state.transactions = [];
      state.finalStocks = [];
      state.warehouses = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Stock Transactions
    builder
      .addCase(fetchStockTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchStockTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Final Stocks
    builder
      .addCase(fetchFinalStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinalStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.finalStocks = action.payload;
      })
      .addCase(fetchFinalStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Warehouses
    builder
      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload;
      })
      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Actions
export const { resetState } = stockManagementSlice.actions;

// Reducer
export default stockManagementSlice.reducer;
