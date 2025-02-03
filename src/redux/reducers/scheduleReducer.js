// path: /src/redux/reducers/scheduleReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSchedules,
  getScheduleById,
  getFinalStockByProductId,
} from "../../services/api";

const savedSchedule =
  JSON.parse(localStorage.getItem("currentSchedule")) || null;

// Async thunk untuk mengambil semua jadwal sementara
export const fetchSchedules = createAsyncThunk(
  "schedules/fetchSchedules",
  async () => {
    console.log("Fetching all schedules..."); // Debug log untuk memulai fetching
    const schedules = await getSchedules();
    console.log("Fetched schedules:", schedules); // Debug log untuk hasil yang diterima
    return schedules;
  }
);

// Async thunk untuk mengambil jadwal sementara berdasarkan ID
export const fetchScheduleById = createAsyncThunk(
  "schedules/fetchScheduleById",
  async (id) => {
    console.log(`Fetching schedule with ID: ${id}`); // Debug log untuk memulai fetching berdasarkan ID
    const schedule = await getScheduleById(id);
    console.log(`Fetched schedule with ID ${id}:`, schedule); // Debug log untuk hasil yang diterima berdasarkan ID
    return schedule;
  }
);

// Async thunk untuk mengambil data final stock berdasarkan ID produk
export const fetchFinalStockByProductId = createAsyncThunk(
  "schedules/fetchFinalStockByProductId",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      console.log(`Fetching final stock for product ID: ${id}`);
      const finalStock = await getFinalStockByProductId(id);

      if (!finalStock || finalStock.length === 0) {
        console.warn(`Final stock untuk produk ID ${id} tidak ditemukan.`);
        dispatch(markProductAsEmpty(id)); // ✅ Langsung tandai sebagai kosong
        return rejectWithValue("Stok tidak ditemukan");
      }

      console.log("Fetched final stock:", finalStock);
      return finalStock;
    } catch (error) {
      console.error(`Failed to fetch final stock for product ID ${id}:`, error);
      dispatch(markProductAsEmpty(id)); // ✅ Tangani error dengan menandai produk kosong
      return rejectWithValue(
        error.response?.data?.message || "Gagal mengambil stok"
      );
    }
  }
);

// Action untuk memilih stok
export const addSelectedStock = (stock) => (dispatch, getState) => {
  const { selectedStock } = getState().schedules;

  // Hapus stok sebelumnya jika ada untuk produk yang sama
  const filteredStock = selectedStock.filter(
    (item) => item.final_id_produk !== stock.final_id_produk
  );

  dispatch({
    type: "schedules/setSelectedStock",
    payload: [...filteredStock, stock], // Simpan stok baru untuk produk ini
  });
};

// Action untuk menghapus stok dari selectedStock
export const removeSelectedStock = (stockId) => (dispatch, getState) => {
  const { selectedStock } = getState().schedules;

  dispatch({
    type: "schedules/setSelectedStock",
    payload: selectedStock.filter((item) => item.final_id !== stockId),
  });
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState: {
    list: [],
    currentSchedule: savedSchedule,
    finalStock: [],
    selectedStock: [],
    emptyStockProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    setCurrentSchedule: (state, action) => {
      state.currentSchedule = action.payload;
      localStorage.setItem("currentSchedule", JSON.stringify(action.payload)); // ⬅️ Simpan ke localStorage
    },
    clearSchedule: (state) => {
      state.currentSchedule = null;
      localStorage.removeItem("currentSchedule"); // ⬅️ Hapus dari localStorage saat direset
    },
    markProductAsEmpty: (state, action) => {
      state.emptyStockProducts.push(action.payload); // ✅ Tandai produk yang stoknya kosong
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching schedules... Pending state"); // Debug log untuk status pending
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        console.log("Fetching schedules successful. Data:", action.payload); // Debug log untuk data yang diterima
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error(
          "Fetching schedules failed. Error:",
          action.error.message
        ); // Debug log untuk error
      })
      .addCase(fetchScheduleById.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching schedule by ID... Pending state");
      })
      .addCase(fetchScheduleById.fulfilled, (state, action) => {
        state.currentSchedule = action.payload;
        state.loading = false;
        console.log("Fetched schedule by ID successfully:", action.payload);
      })
      .addCase(fetchScheduleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Failed to fetch schedule by ID:", action.error.message);
      })
      .addCase(fetchFinalStockByProductId.pending, (state) => {
        // Jika sudah ada data finalStock, tidak perlu ambil lagi
        if (state.finalStock.length > 0) {
          console.log("Final stock already fetched, skipping fetch.");
          return;
        }
        state.loading = true;
        state.error = null;
        console.log("Fetching final stock... Pending state");
      })
      .addCase(fetchFinalStockByProductId.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          console.warn("Stok kosong, menandai produk ini sebagai kosong.");
          state.emptyStockProducts.push(action.meta.arg); // ✅ Simpan ID produk yang stoknya kosong
        } else {
          const newStock = action.payload.filter(
            (newItem) =>
              !state.finalStock.some(
                (existing) => existing.final_id === newItem.final_id
              )
          );
          state.finalStock = [...state.finalStock, ...newStock];
        }
        state.loading = false;
      })

      .addCase(fetchFinalStockByProductId.rejected, (state, action) => {
        state.loading = false;
        console.error(
          "Fetching final stock failed. Error:",
          action.error.message
        );

        // Jika produk tidak ditemukan (404), tandai sebagai stok kosong
        if (action.payload === "Stok tidak ditemukan") {
          const productId = action.meta.arg;
          if (!state.emptyStockProducts.includes(productId)) {
            console.warn(`Menandai produk ${productId} sebagai kosong.`);
            state.emptyStockProducts.push(productId);
          }
        }

        // Simpan error khusus untuk stok tanpa mempengaruhi error utama Redux
        state.finalStockError = action.error.message;
      });
  },
});

export const { setCurrentSchedule, clearSchedule } = scheduleSlice.actions;
export const { markProductAsEmpty } = scheduleSlice.actions;

export default scheduleSlice.reducer;
