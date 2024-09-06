// path: /src/components/ProductManagement/ProductList.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MdAddCircleOutline, MdSearch, MdMenu } from "react-icons/md"; // Ikon dari react-icons
import ProductCard from "./ProductCard"; // Mengimpor ProductCard
import { getProducts } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery"; // Untuk menentukan apakah di mobile atau tidak
import Loading from "../Loading";

const ProductList = ({ onAddProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata pencarian
  const [drawerOpen, setDrawerOpen] = useState(false); // State untuk drawer
  const isMobile = useMediaQuery("(max-width:600px)"); // Cek jika di mobile
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading

  const sortProductsByName = (products) => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    // Mendapatkan daftar produk dari API
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const sortedData = sortProductsByName(data);
        setProducts(sortedData);
        setFilteredProducts(sortedData);

        // Mengambil kategori dari produk
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.Category?.category))
        );
        setCategories(["All", ...uniqueCategories]); // Tambahkan "All" untuk menampilkan semua produk
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false); // Set loading ke false setelah selesai fetching
    };

    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    let filtered =
      category === "All"
        ? products
        : products.filter((product) => product.Category?.category === category);

    setFilteredProducts(sortProductsByName(filtered));
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchValue) &&
        (selectedCategory === "All" ||
          product.Category?.category === selectedCategory)
    );

    setFilteredProducts(sortProductsByName(filtered));
  };

  if (loading) {
    return <Loading />; // Tampilkan animasi loading saat data sedang diambil
  }

  return (
    <Box>
      {isMobile ? (
        // Tampilan untuk Mobile
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
        >
          {/* Icon Hamburger untuk membuka drawer */}
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MdMenu />
          </IconButton>

          {/* Input pencarian produk dengan ikon search */}
          <TextField
            placeholder="Cari Produk"
            size="small"
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

          {/* Icon Tambah Produk */}
          <IconButton color="primary" onClick={onAddProduct}>
            <MdAddCircleOutline />
          </IconButton>

          {/* Drawer untuk kategori dan form pencarian */}
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

              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <Typography
                    key={index}
                    onClick={() => handleFilter(category)}
                    variant="body1"
                    sx={{
                      mb: 1,
                      cursor: "pointer",
                      textTransform: "none",
                      fontWeight:
                        selectedCategory === category ? "bold" : "normal",
                      color:
                        selectedCategory === category
                          ? "primary.main"
                          : "text.primary",
                      "&:hover": {
                        textDecoration: "underline", // Menambahkan underline saat hover
                      },
                    }}
                  >
                    {category}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">
                  Tidak ada kategori tersedia.
                </Typography>
              )}
            </Box>
          </Drawer>
        </Box>
      ) : (
        // Tampilan untuk Desktop
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between" // Untuk memisahkan elemen kiri dan kanan
          mb={2}
          sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            {/* Tulisan "Daftar Produk" */}
            <Typography variant="h4" sx={{ marginRight: 2 }}>
              Daftar Produk
            </Typography>

            {/* Input pencarian produk dengan ikon search di bagian end */}
            <TextField
              label="Tulis Nama Produk"
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{ maxWidth: "600px", mr: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Button Tambah Produk di sebelah kanan */}
          <Button
            variant="contained"
            color="primary"
            onClick={onAddProduct}
            startIcon={<MdAddCircleOutline />} // Menambahkan ikon
          >
            Tambah Produk
          </Button>
        </Box>
      )}

      {/* Daftar Kategori */}
      {!isMobile && (
        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Button
                key={index}
                variant={
                  selectedCategory === category ? "contained" : "outlined"
                }
                color={selectedCategory === category ? "primary" : "default"}
                onClick={() => handleFilter(category)}
                sx={{
                  textTransform: "none", // Menonaktifkan uppercase
                  fontWeight: "bold",
                  minWidth: "80px",
                  whiteSpace: "nowrap", // Mencegah teks terpotong
                }}
              >
                {category}
              </Button>
            ))
          ) : (
            <Typography variant="body1">
              Tidak ada kategori tersedia.
            </Typography>
          )}
        </Box>
      )}

      <Box mt={2}>
        {filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product, index) => (
              <Grid size={{ xs: 6, md: 4, lg: 2 }} key={index}>
                {/* Menggunakan ProductCard untuk setiap produk */}
                <ProductCard product={product} />
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
  );
};

export default ProductList;
