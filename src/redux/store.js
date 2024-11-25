// path: /src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    warehouses: warehouseReducer,
    incomingStock: incomingStockReducer,
    finalStock: finalStockReducer,
    customers: customerReducer,
    outgoingStock: outgoingStockReducer,

    ekspedisiRekanan: ekspedisiRekananReducer,
    teamGudang: teamGudangReducer,
    kendaraan: kendaraanReducer,
  },
});

export default store;
