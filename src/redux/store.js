// path: /src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import warehouseReducer from "./reducers/warehouseReducer";
import incomingStockReducer from "./reducers/incomingStockReducer";
import finalStockReducer from "./reducers/finalStockReducer";
import customerReducer from "./reducers/customerReducer";
import outgoingStockReducer from "./reducers/outgoingStockReducer";

import ekspedisiRekananReducer from "./reducers/ekspedisiRekananReducer";
import teamGudangReducer from "./reducers/teamGudangReducer";
import kendaraanReducer from "./reducers/kendaraanReducer";

import overviewReducer from "./reducers/overviewReducer";
import stockManagementReducer from "./reducers/stockManagementReducer";
import scheduleReducer from "./reducers/scheduleReducer";

// Gabungkan semua reducers
const appReducer = combineReducers({
  products: productReducer,
  auth: authReducer, // Jangan reset ini
  warehouses: warehouseReducer,
  incomingStock: incomingStockReducer,
  finalStock: finalStockReducer,
  customers: customerReducer,
  outgoingStock: outgoingStockReducer,
  ekspedisiRekanan: ekspedisiRekananReducer,
  teamGudang: teamGudangReducer,
  kendaraan: kendaraanReducer,
  overview: overviewReducer,
  stockManagement: stockManagementReducer,
  schedules: scheduleReducer,
});

// Custom reducer untuk reset semua state, kecuali auth
const rootReducer = (state, action) => {
  if (action.type === "RESET_APP_STATE") {
    console.log("🔄 Resetting Redux state, but keeping auth...");
    return {
      auth: state.auth, // ✅ Simpan auth agar token tetap ada
      ...appReducer(undefined, action),
    };
  }
  return appReducer(state, action);
};

// Konfigurasi store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
