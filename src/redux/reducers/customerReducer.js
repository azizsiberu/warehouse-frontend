//path: /src/redux/reducers/customerReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomers } from "../../services/api";

// Async thunk untuk mengambil data pelanggan dari API
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const customers = await getCustomers();
    return customers;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Tambahkan reducer tambahan di sini jika diperlukan
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;
