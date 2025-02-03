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
  async (error) => {
    console.log("Interceptor Error:", error.response?.status);

    if (error.response?.status === 401 || error.response?.status === 403) {
      store.dispatch(clearAuth());
      localStorage.removeItem("authToken");

      console.log("Redirecting to login due to unauthorized access");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Fungsi untuk **validasi token** saat aplikasi pertama kali dijalankan
export const validateToken = async () => {
  try {
    const response = await api.get("/api/auth/validate-token");
    return response.data; // Jika token valid, lanjutkan
  } catch (error) {
    console.error("Token tidak valid:", error);
    throw error;
  }
};

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

// Fungsi untuk menambahkan lokasi gudang baru
export const addWarehouse = async (warehouseData) => {
  const response = await api.post("/api/warehouses", warehouseData);
  return response.data;
};

// Fungsi untuk memperbarui lokasi gudang
export const updateWarehouse = async (id, warehouseData) => {
  const response = await api.put(`/api/warehouses/${id}`, warehouseData);
  return response.data;
};

// Fungsi untuk menghapus lokasi gudang
export const deleteWarehouse = async (id) => {
  const response = await api.delete(`/api/warehouses/${id}`);
  return response.data;
};

export const submitIncomingStock = async (payload) => {
  const response = await api.post("/api/incoming-stocks", payload);
  return response.data; // Kembalikan data dari API setelah berhasil
};

// Fungsi untuk mendapatkan semua produk dari final stock
export const getAllFinalStock = async () => {
  const response = await api.get("/api/final-stocks");
  return response.data;
};

// Fungsi untuk mendapatkan produk final stock berdasarkan lokasi
export const getAvailableFinalStockByLocation = async (id_lokasi) => {
  const response = await api.get(`/api/final-stocks/available`, {
    params: { id_lokasi },
  });
  return response.data;
};

// Fungsi untuk mendapatkan detail produk final stock berdasarkan id_lokasi dan id_produk
export const getFinalStockDetails = async (id_lokasi, id_produk) => {
  const response = await api.get(`/api/final-stocks/details`, {
    params: { id_lokasi, id_produk },
  });
  return response.data;
};

// Fungsi untuk membuat outgoing stock
export const createOutgoingStock = async (payload) => {
  console.log("Payload to be sent to backend:", payload); // Debug log
  const response = await api.post("/api/outgoing-stocks", payload);
  console.log("Response from backend:", response); // Debug log
  return response.data;
};

// Fungsi untuk mendapatkan semua pelanggan
export const getCustomers = async () => {
  const response = await api.get("/api/customers/");
  return response.data; // Mengembalikan data pelanggan dari API
};

// Fungsi untuk mendapatkan semua data dari team_gudang
export const getTeamGudang = async () => {
  const response = await api.get("/api/team-gudang");
  return response.data; // Mengembalikan data dari API
};

// Fungsi untuk menambahkan anggota ke team_gudang
export const createTeamGudangMember = async (memberData) => {
  const response = await api.post("/api/team-gudang", memberData);
  return response.data; // Mengembalikan data dari API setelah berhasil ditambahkan
};

// Memperbarui anggota tim gudang
export const updateTeamGudangMember = async (id, memberData) => {
  const response = await api.put(`/api/team-gudang/${id}`, memberData);
  return response.data; // Mengembalikan data setelah diperbarui
};

// Menonaktifkan anggota tim gudang berdasarkan ID
export const deactivateTeamGudangMember = async (id) => {
  const response = await api.delete(`/api/team-gudang/${id}`);
  return response.data; // Mengembalikan status penonaktifan
};

export const getKendaraan = async () => {
  const response = await api.get("/api/kendaraan");
  return response.data;
};

export const createKendaraan = async (data) => {
  const response = await api.post("/api/kendaraan", data);
  return response.data;
};

// Memperbarui kendaraan
export const updateKendaraan = async (id, vehicleData) => {
  const response = await api.put(`/api/kendaraan/${id}`, vehicleData);
  return response.data; // Mengembalikan data setelah diperbarui
};

// Menonaktifkan kendaraan berdasarkan ID
export const deactivateKendaraan = async (id) => {
  const response = await api.delete(`/api/kendaraan/${id}`);
  return response.data; // Mengembalikan status penonaktifan
};

// Fungsi untuk mendapatkan semua data dari ekspedisi_rekanan
export const getEkspedisiRekanan = async () => {
  const response = await api.get("/api/ekspedisi-rekanan");
  return response.data; // Mengembalikan data dari API
};

// Fungsi untuk menambahkan data ekspedisi rekanan
export const createEkspedisiRekanan = async (expeditionData) => {
  const response = await api.post("/api/ekspedisi-rekanan", expeditionData);
  return response.data; // Mengembalikan data dari API setelah berhasil ditambahkan
};

// Memperbarui ekspedisi rekanan
export const updateEkspedisiRekanan = async (id, expeditionData) => {
  const response = await api.put(
    `/api/ekspedisi-rekanan/${id}`,
    expeditionData
  );
  return response.data; // Mengembalikan data setelah diperbarui
};

// Menonaktifkan ekspedisi rekanan berdasarkan ID
export const deactivateEkspedisiRekanan = async (id) => {
  const response = await api.delete(`/api/ekspedisi-rekanan/${id}`);
  return response.data; // Mengembalikan status penonaktifan
};

// Fungsi untuk mendapatkan statistik utama (Main Stats)
export const getMainStats = async () => {
  const response = await api.get("/api/stocks/main-stats");
  return response.data;
};

// Fungsi untuk mendapatkan distribusi stok
export const getStockDistribution = async () => {
  const response = await api.get("/api/stocks/distribution");
  return response.data;
};

// Fungsi untuk mendapatkan tren stok bulan ini
export const getStockTrend = async () => {
  const response = await api.get("/api/stocks/trend");
  return response.data;
};

// Fungsi untuk mendapatkan aktivitas terbaru
export const getRecentActivities = async () => {
  const response = await api.get("/api/stocks/recent");
  return response.data;
};

// Fungsi untuk mendapatkan peringatan stok rendah
export const getLowStockWarning = async () => {
  const response = await api.get("/api/stocks/low-stock");
  return response.data;
};

// Fungsi untuk mendapatkan riwayat transaksi stok berdasarkan productId dan opsi filter gudang
export const getStockTransactions = async (productId, warehouseId = null) => {
  const response = await api.get(`/api/stocks/transactions/${productId}`, {
    params: warehouseId ? { warehouseId } : {}, // Tambahkan filter gudang jika ada
  });
  return response.data;
};

// Fungsi untuk menambahkan shipping details
export const addShippingDetails = async (shippingData) => {
  const response = await api.post("/api/products/shipping", shippingData);
  return response.data;
};

// Fungsi untuk mendapatkan shipping details berdasarkan id_produk
export const getShippingDetailsByProductId = async (id_produk) => {
  const response = await api.get(`/api/products/shipping/${id_produk}`);
  return response.data;
};

// Fungsi untuk memperbarui shipping details
export const updateShippingDetails = async (id_produk, shippingData) => {
  const response = await api.put(
    `/api/products/shipping/${id_produk}`,
    shippingData
  );
  return response.data;
};

// Fungsi untuk menghapus shipping details
export const deleteShippingDetails = async (id_produk) => {
  const response = await api.delete(`/api/products/shipping/${id_produk}`);
  return response.data;
};

// Fungsi untuk mendapatkan semua jadwal sementara
export const getSchedules = async () => {
  const response = await api.get("/api/schedules");
  return response.data; // Mengembalikan data jadwal sementara dari API
};

// Fungsi untuk mendapatkan jadwal sementara berdasarkan ID
export const getScheduleById = async (id) => {
  try {
    console.log(`Fetching schedule with ID: ${id}`);
    const response = await api.get(`/api/schedules/${id}`);
    console.log("Fetched schedule details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedule by ID:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan final stock berdasarkan id jadwal
export const getFinalStockByProductId = async (id) => {
  const response = await api.get(`/api/schedules/stock/${id}`);
  console.log("Final stock for schedule id:", response.data);
  return response.data;
};

// Fungsi untuk menyimpan jadwal pengiriman ke tabel final_schedules
export const finalizeSchedule = async (payload) => {
  const response = await api.post("/api/schedules/final", payload);
  return response.data;
};

// 🔹 Ambil semua jadwal pengiriman final
export const getAllFinalSchedules = async () => {
  const response = await api.get("/api/schedules/final");
  return response.data;
};

// 🔹 Ambil detail jadwal final berdasarkan ID
export const getFinalScheduleById = async (id_schedule) => {
  const response = await api.get(`/api/schedules/final/${id_schedule}`);
  return response.data;
};

export default api;
