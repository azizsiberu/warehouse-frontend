// path: /src/components/Receiving/ReceivingList.js
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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  MdSearch,
  MdMenu,
  MdOutlineAddAPhoto,
  MdShoppingCart,
} from "react-icons/md";
import ProductCard from "../ProductCard";
import { getProducts } from "../../services/api";
import useMediaQuery from "@mui/material/useMediaQuery"; // Untuk menentukan apakah di mobile atau tidak
import Loading from "../Loading";
import StockEntryModal from "./StockEntryModal"; // Impor modal
import RightDrawer from "./RightDrawer";
import RightSidebar from "./RightSidebar";
import { useNavigate } from "react-router-dom"; // Untuk navigasi

const ReceivingList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan kata pencarian
  const [drawerOpen, setDrawerOpen] = useState(false); // State untuk drawer
  const isMobile = useMediaQuery("(max-width:600px)"); // Cek jika di mobile
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading
  const navigate = useNavigate(); // Untuk navigasi
  const sortProductsByName = (products) => {
    return [...products].sort((a, b) => a.nama.localeCompare(b.nama));
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk mengelola buka/tutup modal
  const [selectedProductId, setSelectedProductId] = useState(null); // Menyimpan ID produk yang dipilih

  const [selectedProducts, setSelectedProducts] = useState([]); // Daftar produk yang dipilih
  const [sidebarOpen, setSidebarOpen] = useState(false); // Kontrol RightSidebar di mobile

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
          new Set(data.map((product) => product.kategori))
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
        : products.filter((product) => product.kategori === category);

    setFilteredProducts(sortProductsByName(filtered));
  };

  const handleAddStock = (productId) => {
    console.log("Opening modal for product ID:", productId); // Debugging
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Tutup modal
    setSelectedProductId(null); // Reset produk yang dipilih
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    let filtered = products.filter(
      (product) =>
        product.nama.toLowerCase().includes(searchValue) &&
        (selectedCategory === "All" || product.kategori === selectedCategory)
    );

    setFilteredProducts(sortProductsByName(filtered));
  };

  const handleCardClick = (product) => {
    const productNameSlug = product.nama.replace(/\s+/g, "-").toLowerCase();
    navigate(`/product/${product.id_produk}/${productNameSlug}`, {
      state: { id_product: product.id_produk },
    });
  };

  if (loading) {
    return <Loading />; // Tampilkan animasi loading saat data sedang diambil
  }

  return (
    <Box
      sx={{
        height: "100%", // Atur tinggi agar menyesuaikan parent
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      {isMobile ? (
        // Tampilan untuk Mobile
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
                        textDecoration: "underline",
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{ borderBottom: "1px solid #ccc", paddingBottom: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
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
        </Box>
      )}
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
                  textTransform: "none",
                  fontWeight: "bold",
                  minWidth: "80px",
                  whiteSpace: "nowrap",
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
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Pastikan konten menutupi seluruh tinggi layar
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          {" "}
          {/* FlexGrow agar Grid menutupi seluruh tinggi */}
          <Grid size={{ xs: 12, md: 9, lg: 10 }}>
            <Box mt={2}>
              {filteredProducts.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredProducts.map((product, index) => (
                    <Grid size={{ xs: 6, md: 4, lg: 2 }} key={index}>
                      <ProductCard
                        product={product}
                        buttonLabel="Tambah Stok"
                        onClick={() => handleAddStock(product.id_produk)}
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
            {/* Modal untuk menambah stok */}
            <StockEntryModal
              open={isModalOpen}
              onClose={handleCloseModal}
              productId={selectedProductId} // Kirim id produk ke modal
            />
            {/* Drawer Kanan */}
          </Grid>
          <Grid size={{ xs: 12, md: 3, lg: 2 }}>
            <RightSidebar
              open={sidebarOpen} // Kendalikan dengan state `sidebarOpen`
              onClose={() => setSidebarOpen(false)} // Tutup saat Drawer ditutup
              selectedProducts={selectedProducts} // Produk yang dipilih
            />
          </Grid>
        </Grid>
      </Box>
      {isMobile && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSidebarOpen(true)} // Buka RightSidebar saat tombol diklik
          sx={{ position: "fixed", right: 20, bottom: 20 }}
        >
          <MdShoppingCart size={24} />
        </Button>
      )}
    </Box>
  );
};
export default ReceivingList;
