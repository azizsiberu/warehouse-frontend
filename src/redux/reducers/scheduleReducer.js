// path: /src/redux/reducers/scheduleReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSchedules, getScheduleById } from "../../services/api";

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

const scheduleSlice = createSlice({
  name: "schedules",
  initialState: {
    list: [],
    currentSchedule: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer tambahan bisa ditambahkan jika diperlukan
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
      });
  },
});

export default scheduleSlice.reducer;
