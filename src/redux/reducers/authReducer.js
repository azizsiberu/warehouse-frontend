// path: /src/redux/reducers/authReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyCode,
} from "../../services/api";

// Thunk untuk verifikasi kode
export const verifyCodeThunk = (code) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await verifyCode(code);
    dispatch(setError(null));
    return { error: null }; // Kembalikan objek tanpa error
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Terjadi kesalahan";
    dispatch(setError(errorMessage));
    return { error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Ambil profil dari `localStorage` jika ada
const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {
  nama_lengkap: "",
  foto_profil: "",
};

const savedUserId = localStorage.getItem("userId") || null;

// Tambahkan isAuthenticated ke state awal
const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  loading: false,
  error: null,
  profile: savedProfile, // Set profil dari `localStorage`
  userId: savedUserId, // Tambahkan userId dari `localStorage`
};

// Ubah fungsi setToken dan clearAuth untuk mengelola isAuthenticated
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
      state.isAuthenticated = true;
    },
    setProfile: (state, action) => {
      const { profile, userId } = action.payload;
      state.profile = profile;
      localStorage.setItem("userProfile", JSON.stringify(profile)); // Hanya menyimpan profile
      state.userId = userId;
      localStorage.setItem("userId", userId);
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.profile = { nama_lengkap: "", foto_profil: "" };
      state.userId = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("userId");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setProfile,
  clearAuth,
  setLoading,
  setError,
} = authSlice.actions;

// Thunk untuk registrasi pengguna
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await registerUser(userData);
    dispatch(setUser(user));
    dispatch(setError(null));
    return { error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Terjadi kesalahan";
    dispatch(setError(errorMessage));
    return { error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { token, profile, userId } = await loginUser(credentials);
    dispatch(setToken(token));
    dispatch(setProfile({ profile, userId }));
    dispatch(setError(null));
    return { error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login gagal";
    dispatch(setError(errorMessage));
    return { error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk lupa password
export const forgotPasswordThunk = (email) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await forgotPassword(email);
    dispatch(setError(null));
    return { error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Terjadi kesalahan";
    dispatch(setError(errorMessage));
    return { error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk reset password
export const resetPasswordThunk = (resetData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await resetPassword(resetData);
    dispatch(setError(null));
    return { error: null };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Reset password gagal";
    dispatch(setError(errorMessage));
    return { error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk logout
export const logout = () => (dispatch) => {
  dispatch(clearAuth());
};

export default authSlice.reducer;
