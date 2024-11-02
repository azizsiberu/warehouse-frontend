// path: /src/routes/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated === null) {
    // Jika status autentikasi belum diketahui, Anda bisa menampilkan loading atau null
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
