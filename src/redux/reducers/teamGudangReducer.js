// path: /src/redux/reducers/teamGudangReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getTeamGudang,
  createTeamGudangMember,
  updateTeamGudangMember,
  deactivateTeamGudangMember,
} from "../../services/api";

const initialState = {
  members: [], // Daftar anggota tim gudang
  loading: false, // Status loading
  error: null, // Pesan error jika ada
};

const teamGudangSlice = createSlice({
  name: "teamGudang",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload; // Set daftar anggota
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set status loading
    },
    setError: (state, action) => {
      state.error = action.payload; // Set pesan error
    },
  },
});

export const { setMembers, setLoading, setError } = teamGudangSlice.actions;

// **Thunk untuk mendapatkan semua anggota tim gudang**
export const fetchTeamGudang = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getTeamGudang();
    dispatch(setMembers(data)); // Simpan data ke state Redux
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

// **Thunk untuk menambahkan anggota baru ke tim gudang**
export const createNewTeamGudangMember = (memberData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await createTeamGudangMember(memberData); // Panggil API untuk menambah anggota baru
    dispatch(fetchTeamGudang()); // Refresh daftar anggota setelah penambahan
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

// **Thunk untuk memperbarui anggota tim gudang**
export const updateTeamGudangMemberById =
  (id, memberData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await updateTeamGudangMember(id, memberData); // Panggil API untuk memperbarui data anggota
      dispatch(fetchTeamGudang()); // Refresh daftar anggota setelah pembaruan
    } catch (error) {
      dispatch(setError(error.message)); // Tangani error
    } finally {
      dispatch(setLoading(false)); // Set loading selesai
    }
  };

// **Thunk untuk menonaktifkan anggota tim gudang**
export const deactivateTeamGudangMemberById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await deactivateTeamGudangMember(id); // Panggil API untuk menonaktifkan anggota
    dispatch(fetchTeamGudang()); // Refresh daftar anggota setelah penonaktifan
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Set loading selesai
  }
};

export default teamGudangSlice.reducer;
