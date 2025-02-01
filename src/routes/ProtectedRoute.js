// path: /src/routes/ProtectedRoute.js
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { validateUserToken } from "../redux/reducers/authReducer";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === null) {
      // 🔥 Hanya validasi jika status belum diketahui
      dispatch(validateUserToken());
    }
  }, [dispatch, isAuthenticated]);

  if (isAuthenticated === null) {
    // Jika status autentikasi belum diketahui, Anda bisa menampilkan loading atau null
    return <Loading />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
