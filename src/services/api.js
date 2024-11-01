// path: /src/services/api.js
import axios from "axios";
import store from "../redux/store";
import { clearAuth } from "../redux/reducers/authReducer";

let isLoggingOut = false;

// Buat instance axios dengan baseURL dari .env
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Tambahkan Interceptor untuk Token Otentikasi
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk respon mengarahkan ke login jika token expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error in interceptor:", error.response?.status); // Debug log
    if (error.response?.status === 401 || error.response?.status === 403) {
      store.dispatch(clearAuth());
      localStorage.removeItem("authToken");
      console.log("Redirecting to /login due to unauthorized access"); // Debug log for redirect
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Fungsi untuk registrasi pengguna baru
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

// Fungsi untuk login pengguna
export const loginUser = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);

  if (response.data.token) {
    // Simpan token di localStorage jika tersedia
    localStorage.setItem("authToken", response.data.token);
  }
  console.log(response.data);
  return response.data;
};

// Fungsi untuk lupa password (mengirim kode ke email pengguna)
export const forgotPassword = async (email) => {
  const response = await api.post("/api/auth/forgot-password", { email });
  return response.data;
};

// Fungsi untuk reset password (dengan kode verifikasi)
export const resetPassword = async (resetData) => {
  const response = await api.post("/api/auth/reset-password", resetData);
  return response.data;
};

// Fungsi untuk logout
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

export const verifyCode = async ({ email, code }) => {
  const response = await api.post("/api/auth/verify-code", { email, code });
  return response.data;
};

// Fungsi untuk mendapatkan semua produk
export const getProducts = async () => {
  const response = await api.get("/api/products");
  console.log(response.data);
  return response.data;
};

// Fungsi untuk mendapatkan detail produk berdasarkan id
export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  console.log(response.data);
  return response.data;
};

// Tambahkan fungsi untuk mengedit produk
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/api/products/${id}`, productData);
  return response.data;
};

// Fungsi untuk mendapatkan semua data kain
export const getKainAttributes = async () => {
  const response = await api.get("/api/attributes/kain");
  return response.data;
};

// Fungsi untuk mendapatkan semua data kaki
export const getKakiAttributes = async () => {
  const response = await api.get("/api/attributes/kaki");
  return response.data;
};

// Fungsi untuk mendapatkan semua data dudukan
export const getDudukanAttributes = async () => {
  const response = await api.get("/api/attributes/dudukan");
  return response.data;
};

// Fungsi untuk mendapatkan atribut warna berdasarkan id_kain
export const getWarnaByKainId = async (id_kain) => {
  const response = await api.get(`/api/attributes/warna/${id_kain}`);
  return response.data; // Kembalikan data dari API
};

// Fungsi untuk mendapatkan semua finishing
export const getFinishingAttributes = async () => {
  const response = await api.get(`/api/attributes/finishing`);
  return response.data; // Kembalikan data dari API
};

// Fungsi untuk mendapatkan daftar lokasi warehouse
export const getWarehouses = async () => {
  const response = await api.get("/api/warehouses");
  return response.data;
};

export default api;
