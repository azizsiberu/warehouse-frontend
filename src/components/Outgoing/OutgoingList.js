// path: /src/components/Outgoing/OutgoingList.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdSearch, MdMenu, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import WarehouseSelector from "./WarehouseSelector";
import { fetchFinalStockByLocation } from "../../redux/reducers/finalStockReducer";
import ProductCard from "../ProductCard";
import OutgoingProductModal from "./OutgoingProductModal";
import OutgoingRightSidebar from "./OutgoingRightSidebar";

const OutgoingList = ({ selectedLocation, onLocationChange }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.finalStock.availableStock);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for mobile drawer
  const isMobile = useMediaQuery("(max-width:900px)"); // Check for mobile view
  const [selectedProducts, setSelectedProducts] = useState([]); // Produk yang dipilih

  useEffect(() => {
    if (selectedLocation) {
      dispatch(fetchFinalStockByLocation(selectedLocation.id));
    }
  }, [dispatch, selectedLocation]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter(
        (product) =>
          product.nama?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "All" || product.kategori === selectedCategory)
      );
      setFilteredProducts(filtered);

      const uniqueCategories = [
        "All",
        ...new Set(products.map((product) => product.kategori)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products, searchTerm, selectedCategory]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    let filtered = products.filter(
      (product) =>
        product.nama.toLowerCase().includes(searchValue) &&
        (selectedCategory === "All" || product.kategori === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    let filtered =
      category === "All"
        ? products
        : products.filter((product) => product.kategori === category);
    setFilteredProducts(filtered);
  };

  // Fungsi untuk menambah produk ke daftar pengiriman
  const handleAddToOutgoing = (productData) => {
    setSelectedProducts((prevProducts) => [...prevProducts, productData]);
  };

  const handleDeleteProduct = (productId, variantId) => {
    setSelectedProducts(
      (prevProducts) =>
        prevProducts
          .map((product) => {
            if (product.product.id_produk === productId) {
              // Filter out the specific variant by `variantId`
              const updatedVariants = product.variants.filter(
                (variant) => variant.id !== variantId
              );
              return { ...product, variants: updatedVariants };
            }
            return product;
          })
          .filter((product) => product.variants.length > 0) // Remove product if no variants remain
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Grid container spacing={2}>
        {/* Main Content Area */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <WarehouseSelector
            selectedLocation={selectedLocation}
            onLocationChange={onLocationChange}
          />

          {selectedLocation && (
            <Box mt={2} display="flex" flexDirection="column" gap={2}>
              {isMobile ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                  sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
                >
                  <IconButton onClick={() => setDrawerOpen(true)}>
                    <MdMenu />
                  </IconButton>

                  <TextField
                    placeholder="Cari Produk"
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ flexGrow: 1, marginRight: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MdSearch />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    sx={{ boxShadow: 2 }}
                  >
                    <Box p={2} width={250} role="presentation">
                      <Typography variant="h6" gutterBottom>
                        Kategori
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      {categories.map((category, index) => (
                        <Typography
                          key={index}
                          onClick={() => handleFilter(category)}
                          variant="body1"
                          sx={{
                            mb: 1,
                            cursor: "pointer",
                            fontWeight:
                              selectedCategory === category ? "bold" : "normal",
                            color:
                              selectedCategory === category
                                ? "primary.main"
                                : "text.primary",
                          }}
                        >
                          {category}
                        </Typography>
                      ))}
                    </Box>
                  </Drawer>
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                  sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
                >
                  <TextField
                    label="Cari Produk"
                    size="small"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MdSearch />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
              {/* Category buttons for non-mobile view */}
              {!isMobile && (
                <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedCategory === category ? "contained" : "outlined"
                      }
                      color={
                        selectedCategory === category ? "primary" : "default"
                      }
                      onClick={() => handleFilter(category)}
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        minWidth: "80px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </Box>
              )}
              <Box mt={2}>
                {filteredProducts.length > 0 ? (
                  <Grid container spacing={2}>
                    {filteredProducts.map((product, index) => (
                      <Grid size={{ xs: 6, md: 3 }} key={index}>
                        <ProductCard
                          product={product}
                          buttonLabel="Lihat Detail"
                          onClick={() => handleProductSelect(product)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1">
                    Tidak ada produk dalam kategori ini.
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Grid>

        {/* Right Sidebar */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <OutgoingRightSidebar
            selectedProducts={selectedProducts} // Pass selectedProducts here
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            handleDeleteProduct={handleDeleteProduct} // Tambahkan handleDeleteProduct di sini
          />
        </Grid>
      </Grid>

      {/* Modal untuk detail produk */}
      {selectedProduct && (
        <OutgoingProductModal
          open={modalOpen}
          onClose={handleModalClose}
          product={selectedProduct}
          selectedLocation={selectedLocation}
          variants={filteredProducts.filter(
            (item) => item.id_produk === selectedProduct.id_produk
          )}
          onAddToOutgoing={handleAddToOutgoing} // Prop baru untuk menyimpan produk
        />
      )}

      {/* Sidebar button for mobile */}
      {isMobile && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSidebarOpen(true)}
          sx={{ position: "fixed", right: 20, bottom: 20 }}
        >
          <MdShoppingCart size={24} />
        </Button>
      )}
    </Box>
  );
};

export default OutgoingList;
