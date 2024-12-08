// path: /src/routes/AppRoutes.js
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CustomAppBar from "../components/AppBar";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyCode from "../components/auth/VerifyCode";
import ResetPassword from "../components/auth/ResetPassword";
import DashboardView from "../views/DashboardView";
import OverviewView from "../views/OverviewView";
import StockManagementView from "../views/StockManagementView";
import OperationalView from "../views/OperationalView";
import ProductManagementView from "../views/ProductManagementView";
import ProductDetails from "../components/ProductManagement/ProductDetails";
import ReceivingManagementView from "../views/ReceivingStock";
import ReceivingDetailView from "../views/ReceivingDetailView";
import IncomingLabelView from "../views/IncomingLabelView";
import OutgoingStockView from "../views/OutgoingStockView";
import OutgoingDetailView from "../views/OutgoingDetailView";
import OutgoingLabelView from "../views/OutgoingLabelView";
import { clearAuth } from "../redux/reducers/authReducer";

const APP_NAME = "Ajeg Gudang"; // Define your application name here

const AppRoutes = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Warehouse Management");

  const updateDocumentTitle = (pageTitle) => {
    const fullTitle = `${pageTitle} | ${APP_NAME}`;
    setPageTitle(pageTitle); // Update the state for AppBar
    document.title = fullTitle; // Set the document title
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Periksa apakah pengguna sudah login atau belum
    if (
      !isAuthenticated &&
      !["/login", "/register", "/verify-code", "/reset-password"].includes(
        location.pathname
      )
    ) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

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
              path="/overview"
              element={<OverviewView setPageTitle={updateDocumentTitle} />}
            />
            <Route
              path="/operational"
              element={<OperationalView setPageTitle={updateDocumentTitle} />}
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
            <Route
              path="/receiving-detail/"
              element={
                <ReceivingDetailView setPageTitle={updateDocumentTitle} />
              }
            />
            <Route
              path="/incoming-label"
              element={<IncomingLabelView setPageTitle={updateDocumentTitle} />}
            />
            <Route
              path="/outgoing"
              element={<OutgoingStockView setPageTitle={updateDocumentTitle} />}
            />
            <Route
              path="/outgoing-detail"
              element={
                <OutgoingDetailView setPageTitle={updateDocumentTitle} />
              }
            />
            <Route
              path="/outgoing-label"
              element={<OutgoingLabelView setPageTitle={updateDocumentTitle} />}
            />
            <Route
              path="/inventory-management"
              element={
                <StockManagementView setPageTitle={updateDocumentTitle} />
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
