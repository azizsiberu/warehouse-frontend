// path: /src/redux/reducers/kendaraanReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getKendaraan,
  createKendaraan,
  updateKendaraan,
  deactivateKendaraan,
} from "../../services/api";

const initialState = {
  kendaraan: [], // Daftar kendaraan
  loading: false, // Status loading
  error: null, // Error jika ada
};

const kendaraanSlice = createSlice({
  name: "kendaraan",
  initialState,
  reducers: {
    setKendaraan: (state, action) => {
      state.kendaraan = action.payload; // Set daftar kendaraan
    },
    addKendaraanToList: (state, action) => {
      state.kendaraan.push(action.payload); // Tambahkan kendaraan baru
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set status loading
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error message
    },
  },
});

export const { setKendaraan, addKendaraanToList, setLoading, setError } =
  kendaraanSlice.actions;

// **Thunk untuk mendapatkan daftar kendaraan**
export const fetchKendaraan = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await getKendaraan(); // Panggil API untuk mendapatkan kendaraan
    dispatch(setKendaraan(data)); // Simpan ke state Redux
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

// **Thunk untuk menambahkan kendaraan baru**
export const createNewKendaraan = (kendaraanData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const newKendaraan = await createKendaraan(kendaraanData); // Panggil API untuk menambah kendaraan
    dispatch(addKendaraanToList(newKendaraan)); // Tambahkan ke state Redux
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

// **Thunk untuk memperbarui kendaraan**
export const updateKendaraanById = (id, kendaraanData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await updateKendaraan(id, kendaraanData); // Panggil API untuk memperbarui kendaraan
    dispatch(fetchKendaraan()); // Refresh daftar kendaraan setelah pembaruan
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

// **Thunk untuk menonaktifkan kendaraan**
export const deactivateKendaraanById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deactivateKendaraan(id); // Panggil API untuk menonaktifkan kendaraan
    dispatch(fetchKendaraan()); // Refresh daftar kendaraan setelah penonaktifan
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

export default kendaraanSlice.reducer;
