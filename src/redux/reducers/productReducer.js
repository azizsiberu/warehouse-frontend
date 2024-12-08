// path: /src/redux/reducers/productReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getProductById,
  updateProduct,
  getKainAttributes,
  getKakiAttributes,
  getDudukanAttributes,
  getWarnaByKainId,
  getFinishingAttributes,
  addShippingDetails,
  getShippingDetailsByProductId,
  updateShippingDetails,
  deleteShippingDetails,
} from "../../services/api"; // Impor API

const initialState = {
  products: [], // Untuk menyimpan daftar produk
  productDetails: null, // Untuk menyimpan detail produk
  shippingDetails: null, // Untuk menyimpan shipping details
  kainAttributes: [], // Untuk menyimpan data kain
  kakiAttributes: [], // Untuk menyimpan data kaki
  dudukanAttributes: [], // Untuk menyimpan data dudukan
  warnaOptions: [], // Untuk menyimpan data warna berdasarkan kain
  finishingOptions: [], // Nilai default adalah array kosong
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
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setKainAttributes: (state, action) => {
      state.kainAttributes = action.payload;
    },
    setKakiAttributes: (state, action) => {
      state.kakiAttributes = action.payload;
    },
    setDudukanAttributes: (state, action) => {
      state.dudukanAttributes = action.payload;
    },
    setWarnaOptions: (state, action) => {
      state.warnaOptions = action.payload;
    },
    setFinishingOptions: (state, action) => {
      state.finishingOptions = action.payload;
    },
    // Untuk mengatur loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Untuk mengatur error
    setError: (state, action) => {
      state.error = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  setKainAttributes,
  setKakiAttributes,
  setDudukanAttributes,
  setWarnaOptions,
  setFinishingOptions,
  setLoading,
  setError,
  setProductDetails,
  setShippingDetails,
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
// Thunk untuk mendapatkan atribut kain
export const fetchKainAttributes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const kainAttributes = await getKainAttributes();
    dispatch(setKainAttributes(kainAttributes));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk mendapatkan atribut kaki
export const fetchKakiAttributes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const kakiAttributes = await getKakiAttributes();
    dispatch(setKakiAttributes(kakiAttributes));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk mendapatkan atribut dudukan
export const fetchDudukanAttributes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const dudukanAttributes = await getDudukanAttributes();
    dispatch(setDudukanAttributes(dudukanAttributes));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk mendapatkan warna berdasarkan id_kain
export const fetchWarnaByKainId = (id_kain) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state
    const warnaAttributes = await getWarnaByKainId(id_kain); // Panggil API melalui services
    dispatch(setWarnaOptions(warnaAttributes)); // Simpan data warna di Redux Store
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Matikan loading state
  }
};

// Thunk untuk mendapatkan semua finishing
export const fetchFinishingAttributes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state
    const finishingAttributes = await getFinishingAttributes(); // Panggil API melalui services
    dispatch(setFinishingOptions(finishingAttributes)); // Simpan data finishing di Redux Store
  } catch (error) {
    dispatch(setError(error.message)); // Tangani error
  } finally {
    dispatch(setLoading(false)); // Matikan loading state
  }
};

// Thunk untuk menambahkan shipping details
export const createShippingDetails = (shippingData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await addShippingDetails(shippingData);
    dispatch(setShippingDetails(result));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk untuk mendapatkan shipping details berdasarkan id_produk
export const fetchShippingDetailsByProductId =
  (id_produk) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await getShippingDetailsByProductId(id_produk);
      if (result) {
        dispatch(setShippingDetails(result));
      } else {
        dispatch(setShippingDetails(null)); // Set ke null jika tidak ada data
      }
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setShippingDetails(null)); // Set ke null jika terjadi error
    } finally {
      dispatch(setLoading(false));
    }
  };

// Thunk untuk memperbarui shipping details
export const updateShippingDetailsByProductId =
  (id_produk, shippingData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await updateShippingDetails(id_produk, shippingData);
      dispatch(setShippingDetails(result));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

// Thunk untuk menghapus shipping details
export const deleteShippingDetailsByProductId =
  (id_produk) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await deleteShippingDetails(id_produk);
      dispatch(setShippingDetails(null));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default productSlice.reducer;
