// path: /src/routes/AppRoutes.js
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CustomAppBar from "../components/AppBar";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyCode from "../components/auth/VerifyCode";
import ResetPassword from "../components/auth/ResetPassword";
import DashboardView from "../views/DashboardView";
import ProductManagementView from "../views/ProductManagementView";
import ProductDetails from "../components/ProductManagement/ProductDetails";

const AppRoutes = () => {
  const location = useLocation();

  // Daftar halaman otentikasi di mana AppBar tidak akan ditampilkan
  const authRoutes = ["/login", "/register", "/verify-code", "/reset-password"];

  // Tentukan judul halaman berdasarkan path
  const pageTitles = {
    "/": "Dashboard",
    "/product-management": "Manajemen Produk",
    // Tambahkan pageTitle lainnya jika diperlukan
  };

  // Dapatkan pageTitle berdasarkan path
  const pageTitle = pageTitles[location.pathname] || "Warehouse Management";

  return (
    <>
      {/* Tampilkan AppBar di semua halaman kecuali halaman otentikasi */}
      {!authRoutes.includes(location.pathname) && (
        <>
          <CustomAppBar pageTitle={pageTitle} />
          {/* Menambahkan Toolbar untuk memberikan jarak antara AppBar dan konten */}
        </>
      )}

      {/* Konten halaman */}
      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<DashboardView />} />
          <Route
            path="/product-management"
            element={<ProductManagementView />}
          />
          <Route path="/product/:id/:slug" element={<ProductDetails />} />
          {/* Tambahkan rute lainnya di sini */}
        </Routes>
      </Box>
    </>
  );
};

export default AppRoutes;
