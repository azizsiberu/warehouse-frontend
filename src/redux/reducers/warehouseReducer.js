// path: /src/redux/reducers/warehouseReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getWarehouses } from "../../services/api";

// Initial state untuk warehouse
const initialState = {
  locations: [],
  loading: false,
  error: null,
};

const warehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLocations, setLoading, setError } = warehouseSlice.actions;

// Thunk untuk mengambil lokasi warehouse dari API
export const fetchWarehouses = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getWarehouses();
    dispatch(setLocations(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default warehouseSlice.reducer;
