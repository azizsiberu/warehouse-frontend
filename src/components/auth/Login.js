// path: /src/components/auth/Login.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducers/authReducer";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth); // Mengambil state loading dan error dari Redux

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ identifier, password })).then((result) => {
      if (!result.error) {
        navigate("/");
      }
    });
  };

  const handleForgotPasswordOpen = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100hv",
        display: "flex",
        justifyContent: "center",
        padding: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",

            p: 2,
            mb: 2,
          }}
        >
          <img
            src={LogoWebp}
            alt="Logo"
            width="64"
            height="64"
            style={{ borderRadius: 4 }}
          />
          <Typography variant="h4" sx={{ mt: 2 }}>
            Warehouse Management System
          </Typography>
          <Typography variant="h6">
            {" "}
            Silahkan masuk untuk melanjutkan
          </Typography>
        </Box>

        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email atau Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body1" textAlign={"right"}>
            <Link onClick={handleForgotPasswordOpen}>Lupa Sandi?</Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
        </form>
        <Typography variant="body1">
          Belum punya akun? <Link to="/register">Daftar disini</Link>
        </Typography>
      </Box>
      {/* Dialog Lupa Sandi */}
      <ForgotPasswordDialog
        open={isForgotPasswordOpen}
        onClose={handleForgotPasswordClose}
      />
    </Box>
  );
};

export default Login;
