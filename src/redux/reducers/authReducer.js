// path: /src/redux/reducers/authReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyCode,
  validateToken,
} from "../../services/api";

/* ==========================
   🏗 INITIAL STATE
========================== */
const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || {
  nama_lengkap: "",
  foto_profil: "",
};

const savedUserId = localStorage.getItem("userId") || null;

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  loading: false,
  error: null,
  profile: savedProfile, // Profil pengguna
  userId: savedUserId, // ID pengguna
};

/* ==========================
   🔥 THUNKS (ASYNC ACTIONS)
========================== */

// 🟢 Validasi Token Saat Aplikasi Dibuka
export const validateUserToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { dispatch }) => {
    try {
      console.log("🔍 Memvalidasi token dengan backend...");
      const response = await validateToken();
      dispatch(setUser(response.user)); // Jika valid, set user
      return response;
    } catch (error) {
      console.error("❌ Token tidak valid. Logout otomatis...");
      dispatch(clearAuth());
      return null;
    }
  }
);

// 🟢 Verifikasi Kode (Lupa Password)
export const verifyCodeThunk = (code) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await verifyCode(code);
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

// 🟢 Registrasi Pengguna
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

// 🟢 Login
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

// 🟢 Lupa Password
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

// 🟢 Reset Password
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

// 🟢 Logout
export const logout = () => (dispatch) => {
  dispatch(clearAuth());
};

/* ==========================
   🎛 REDUCERS & ACTIONS
========================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🟢 Set user setelah login atau validasi token
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // 🟢 Set token setelah login
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
      state.isAuthenticated = true;
    },

    // 🟢 Set profil pengguna setelah login
    setProfile: (state, action) => {
      const { profile, userId } = action.payload;
      state.profile = profile;
      state.userId = userId;
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("userId", userId);
    },

    // 🔴 Hapus semua data autentikasi (logout)
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

    // 🟡 Loading State
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 🔴 Error Handling
    setError: (state, action) => {
      state.error = action.payload;
    },

    // 🔍 Cek status autentikasi dari localStorage (Tanpa panggil API)
    checkAuthStatus: (state) => {
      const token = localStorage.getItem("authToken");
      state.isAuthenticated = !!token;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(validateUserToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateUserToken.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(validateUserToken.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

/* ==========================
   🔥 EXPORT ACTIONS & REDUCER
========================== */
export const {
  setUser,
  setToken,
  setProfile,
  clearAuth,
  setLoading,
  setError,
  checkAuthStatus,
} = authSlice.actions;

export default authSlice.reducer;
