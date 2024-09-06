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

export default api;
