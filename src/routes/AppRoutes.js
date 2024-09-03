// path: /src/routes/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import VerifyCode from '../components/auth/VerifyCode';
import ResetPassword from '../components/auth/ResetPassword';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verify-code" element={<VerifyCode />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    {/* Tambahkan rute lainnya di sini */}
  </Routes>
);

export default AppRoutes;
