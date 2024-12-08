// path: /src/redux/reducers/ekspedisiRekananReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getEkspedisiRekanan,
  createEkspedisiRekanan,
  updateEkspedisiRekanan,
  deactivateEkspedisiRekanan,
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
      state.expeditions = action.payload; // Set daftar ekspedisi
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set status loading
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
    },
  },
});

export const { setExpeditions, setLoading, setError } =
  ekspedisiRekananSlice.actions;

// **Thunk untuk mendapatkan semua ekspedisi rekanan**
export const fetchEkspedisiRekanan = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getEkspedisiRekanan();
    dispatch(setExpeditions(data)); // Simpan ke state Redux
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

// **Thunk untuk menambahkan ekspedisi rekanan baru**
export const createNewEkspedisiRekanan =
  (expeditionData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await createEkspedisiRekanan(expeditionData); // Panggil API untuk menambah ekspedisi
      dispatch(fetchEkspedisiRekanan()); // Refresh daftar ekspedisi setelah penambahan
    } catch (error) {
      dispatch(setError(error.message)); // Tangani error
    } finally {
      dispatch(setLoading(false)); // Set loading selesai
    }
  };

// **Thunk untuk memperbarui ekspedisi rekanan**
export const updateEkspedisiRekananById =
  (id, expeditionData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await updateEkspedisiRekanan(id, expeditionData); // Panggil API untuk memperbarui ekspedisi
      dispatch(fetchEkspedisiRekanan()); // Refresh daftar ekspedisi setelah pembaruan
    } catch (error) {
      dispatch(setError(error.message)); // Tangani error
    } finally {
      dispatch(setLoading(false)); // Set loading selesai
    }
  };

// **Thunk untuk menonaktifkan ekspedisi rekanan**
export const deactivateEkspedisiRekananById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await deactivateEkspedisiRekanan(id); // Panggil API untuk menonaktifkan ekspedisi
    dispatch(fetchEkspedisiRekanan()); // Refresh daftar ekspedisi setelah penonaktifan
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

export default ekspedisiRekananSlice.reducer;
