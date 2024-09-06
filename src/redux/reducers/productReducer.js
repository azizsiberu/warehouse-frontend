// path: /src/redux/reducers/productReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getProductById, updateProduct } from "../../services/api"; // Impor API

const initialState = {
  products: [], // Untuk menyimpan daftar produk
  productDetails: null, // Untuk menyimpan detail produk
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Tambahkan produk
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    // Edit produk
    editProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    // Hapus produk
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    // Untuk mengatur loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Untuk mengatur error
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Untuk menyimpan detail produk
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  setLoading,
  setError,
  setProductDetails,
} = productSlice.actions;

// Thunk untuk mendapatkan detail produk dari API
export const fetchProductById = (id) => async (dispatch) => {
  console.log("Fetching product by ID:", id);
  try {
    dispatch(setLoading(true));
    console.log("Calling getProductById API...");
    const product = await getProductById(id);
    console.log("Product received from API:", product);
    dispatch(setProductDetails(product));
  } catch (error) {
    console.error("Error fetching product:", error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk mengupdate produk
export const updateProductDetails = (id, productData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const updatedProduct = await updateProduct(id, productData);
    dispatch(editProduct(updatedProduct));
    dispatch(setProductDetails(updatedProduct));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
