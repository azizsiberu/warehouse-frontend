//path: /src/redux/reducers/outgoingStockReducer.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOutgoingStock } from "../../services/api"; // API function

// Async Thunk untuk mengirim data ke backend
export const submitOutgoingStock = createAsyncThunk(
  "outgoingStock/submitOutgoingStock",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createOutgoingStock(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const outgoingStockSlice = createSlice({
  name: "outgoingStock",
  initialState: {
    selectedProducts: [],
    selectedDestination: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedProducts(state, action) {
      state.selectedProducts = action.payload;
    },
    setSelectedDestination(state, action) {
      console.log(
        "Dispatch diterima di reducer dengan payload:",
        action.payload
      );

      // Validasi payload sebelum menyimpannya
      if (!action.payload || !action.payload.type) {
        console.error("Invalid destination payload:", action.payload);
        return;
      }

      // Cegah overwrite jika type sudah sama
      if (
        state.selectedDestination &&
        state.selectedDestination.type === action.payload.type &&
        state.selectedDestination.id === action.payload.id
      ) {
        console.log("Payload sama dengan state sebelumnya, tidak diubah.");
        return;
      }

      // Perbarui state
      state.selectedDestination = action.payload;

      console.log(
        "Updated Selected Destination in Redux:",
        state.selectedDestination
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOutgoingStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOutgoingStock.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitOutgoingStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal menyimpan pengiriman.";
      });
  },
});

export const { setSelectedProducts, setSelectedDestination } =
  outgoingStockSlice.actions;

export default outgoingStockSlice.reducer;
