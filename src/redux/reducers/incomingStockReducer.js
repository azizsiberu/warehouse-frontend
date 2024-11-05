// path: /src/redux/reducers/incomingStockReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { submitIncomingStock } from "../../services/api";

const initialState = {
  incomingStocks: [],
  loading: false,
  error: null,
};

const incomingStockSlice = createSlice({
  name: "incomingStock",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addIncomingStock: (state, action) => {
      state.incomingStocks.push(action.payload);
    },
  },
});

export const { setLoading, setError, addIncomingStock } =
  incomingStockSlice.actions;

export const submitIncomingStockThunk = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await submitIncomingStock(payload);
    dispatch(addIncomingStock(response));
    return { success: true };
  } catch (error) {
    const errorData = error.response?.data;
    const errorMessage = errorData?.message || "Gagal menambahkan stok masuk";
    const missingFields = errorData?.missingFields || null;
    dispatch(setError({ message: errorMessage, missingFields }));
    return { success: false, message: errorMessage, missingFields };
  } finally {
    dispatch(setLoading(false));
  }
};

export default incomingStockSlice.reducer;
