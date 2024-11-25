// path: /src/redux/reducers/teamGudangReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getTeamGudang, createTeamGudangMember } from "../../services/api";

const initialState = {
  members: [],
  loading: false,
  error: null,
};

const teamGudangSlice = createSlice({
  name: "teamGudang",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMembers, setLoading, setError } = teamGudangSlice.actions;

// Thunk untuk mendapatkan semua anggota team_gudang
export const fetchTeamGudang = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await getTeamGudang();
    dispatch(setMembers(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk menambahkan anggota baru ke team_gudang
export const addTeamGudangMember = (memberData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await createTeamGudangMember(memberData);
    dispatch(fetchTeamGudang()); // Refresh data setelah menambahkan anggota
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default teamGudangSlice.reducer;
