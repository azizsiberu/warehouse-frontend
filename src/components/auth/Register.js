// path: /src/components/auth/Register.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/reducers/authReducer";
import LogoWebp from "../../assets/logo/logo-ajeg-hijau-64.webp";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (!isEmailValid || !isPhoneValid) {
      alert("Format email atau nomor HP tidak sesuai.");
      return;
    }
    dispatch(register({ fullName, email, phone, password })).then((result) => {
      if (!result.error) {
        navigate("/login");
      }
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setIsPhoneValid(validatePhone(value));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
            Silahkan daftar untuk melanjutkan
          </Typography>
        </Box>

        <form onSubmit={handleRegister}>
          <Grid container spacing={2} sx={{ maxWidth: "700px" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Nama Lengkap"
                variant="outlined"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!isEmailValid}
                helperText={!isEmailValid && "Format email tidak sesuai"}
              />
            </Grid>
            <TextField
              label="Nomor HP"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              error={!isPhoneValid}
              helperText={!isPhoneValid && "Nomor HP hanya boleh berisi angka"}
            />
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Password"
                variant="outlined"
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
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Konfirmasi Password"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Daftar"}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
        </form>
        <Typography variant="body1">
          Sudah punya akun? <Link to="/login">Masuk disini</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
