// Path: /src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008080", // Primary color
    },
    secondary: {
      main: "#FFC228", // Secondary color
    },
    success: {
      main: "#2A9928", // Green color
    },
    warning: {
      main: "#F4B63C", // Yellow color
    },
    error: {
      main: "#FF2E2E", // Red/Error color
    },
    neutral: {
      main: "#241F1C", // Dark/Neutral color
    },
    background: {
      default: "#whitesmoke", // Ganti dengan warna background yang Anda inginkan
    },
  },
  typography: {
    fontFamily: "Open Sans, Raleway, Arial",
    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem", // Ukuran font untuk h1
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2rem", // Ukuran font untuk h2
    },
    h3: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1.75rem", // Ukuran font untuk h3
    },
    h4: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1.5rem", // Ukuran font untuk h4
    },
    h5: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1.25rem", // Ukuran font untuk h5
    },
    h6: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1rem", // Ukuran font untuk h6
    },
    subtitle1: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "1rem", // Ukuran font untuk subtitle1
    },
    body1: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "1rem", // Ukuran font untuk body1
    },
    body2: {
      fontFamily: "Open Sans",
      fontWeight: 400,
      fontSize: "0.875rem", // Ukuran font untuk body2
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          fontFamily: "Raleway",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
