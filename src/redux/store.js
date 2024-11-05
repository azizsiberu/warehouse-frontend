// path: /src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import warehouseReducer from "./reducers/warehouseReducer";
import incomingStockReducer from "./reducers/incomingStockReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    warehouses: warehouseReducer,
    incomingStock: incomingStockReducer,
  },
});

export default store;
