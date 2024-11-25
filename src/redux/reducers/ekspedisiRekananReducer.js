// path: /src/redux/reducers/ekspedisiRekananReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getEkspedisiRekanan,
  createEkspedisiRekanan,
} from "../../services/api";

const initialState = {
  expeditions: [],
  loading: false,
  error: null,
};

const ekspedisiRekananSlice = createSlice({
  name: "ekspedisiRekanan",
  initialState,
  reducers: {
    setExpeditions: (state, action) => {
      state.expeditions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setExpeditions, setLoading, setError } =
  ekspedisiRekananSlice.actions;

// Thunk untuk mendapatkan semua data ekspedisi rekanan
export const fetchEkspedisiRekanan = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getEkspedisiRekanan();
    dispatch(setExpeditions(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk menambahkan data ekspedisi rekanan
export const addEkspedisiRekanan = (expeditionData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await createEkspedisiRekanan(expeditionData);
    dispatch(fetchEkspedisiRekanan()); // Refresh data setelah menambahkan ekspedisi
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default ekspedisiRekananSlice.reducer;
