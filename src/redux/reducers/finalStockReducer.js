// path: /src/redux/reducers/finalStockReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllFinalStock,
  getAvailableFinalStockByLocation,
  getFinalStockDetails,
} from "../../services/api";

// Thunks untuk mendapatkan semua produk dari final stock
export const fetchAllFinalStock = createAsyncThunk(
  "finalStock/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllFinalStock();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunks untuk mendapatkan produk final stock berdasarkan lokasi
export const fetchFinalStockByLocation = createAsyncThunk(
  "finalStock/fetchByLocation",
  async (id_lokasi, { rejectWithValue }) => {
    try {
      const data = await getAvailableFinalStockByLocation(id_lokasi);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk untuk mendapatkan detail produk final stock berdasarkan lokasi dan produk
export const fetchFinalStockDetails = createAsyncThunk(
  "finalStock/fetchDetails",
  async ({ id_lokasi, id_produk }, { rejectWithValue }) => {
    try {
      const data = await getFinalStockDetails(id_lokasi, id_produk);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice untuk mengelola state final stock
const finalStockSlice = createSlice({
  name: "finalStock",
  initialState: {
    allFinalStock: [],
    availableStock: [],
    selectedStockDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFinalStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFinalStock.fulfilled, (state, action) => {
        state.loading = false;
        state.allFinalStock = action.payload;
      })
      .addCase(fetchAllFinalStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFinalStockByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinalStockByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.availableStock = action.payload;
      })
      .addCase(fetchFinalStockByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFinalStockDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinalStockDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStockDetails = action.payload;
      })
      .addCase(fetchFinalStockDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default finalStockSlice.reducer;
