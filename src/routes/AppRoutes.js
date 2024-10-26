// path: /src/routes/AppRoutes.js
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import { Box } from "@mui/material";
import CustomAppBar from "../components/AppBar";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyCode from "../components/auth/VerifyCode";
import ResetPassword from "../components/auth/ResetPassword";
import DashboardView from "../views/DashboardView";
import ProductManagementView from "../views/ProductManagementView";
import ProductDetails from "../components/ProductManagement/ProductDetails";
import ReceivingManagementView from "../views/ReceivingStock";

const APP_NAME = "Ajeg Gudang"; // Define your application name here

const AppRoutes = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Warehouse Management");

  const updateDocumentTitle = (pageTitle) => {
    const fullTitle = `${pageTitle} | ${APP_NAME}`;
    setPageTitle(pageTitle); // Update the state for AppBar
    document.title = fullTitle; // Set the document title
  };

  // Daftar halaman otentikasi di mana AppBar tidak akan ditampilkan
  const authRoutes = ["/login", "/register", "/verify-code", "/reset-password"];

  return (
    <>
      {!authRoutes.includes(location.pathname) && (
        <CustomAppBar pageTitle={pageTitle} />
      )}

      <Box sx={{ padding: 2 }}>
        <Routes>
          <Route
            path="/login"
            element={<Login setPageTitle={updateDocumentTitle} />}
          />
          <Route
            path="/register"
            element={<Register setPageTitle={updateDocumentTitle} />}
          />
          <Route
            path="/verify-code"
            element={<VerifyCode setPageTitle={updateDocumentTitle} />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword setPageTitle={updateDocumentTitle} />}
          />

          {/* Bungkus rute yang dilindungi dengan ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={<DashboardView setPageTitle={updateDocumentTitle} />}
            />
            <Route
              path="/product-management"
              element={
                <ProductManagementView setPageTitle={updateDocumentTitle} />
              }
            />
            <Route
              path="/product/:id/:slug"
              element={<ProductDetails setPageTitle={updateDocumentTitle} />}
            />
            <Route
              path="/receiving"
              element={
                <ReceivingManagementView setPageTitle={updateDocumentTitle} />
              }
            />
            {/* Tambahkan rute lainnya yang dilindungi di sini */}
          </Route>
        </Routes>
      </Box>
    </>
  );
};

export default AppRoutes;
