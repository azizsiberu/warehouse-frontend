// path: /src/services/api.js
import axios from "axios";

// Buat instance axios dengan baseURL dari .env
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

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

export default api;
