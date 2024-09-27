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
      fontWeight: 600,
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
  shadows: [
    "none", // Shadow level 0
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 1
    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 2
    "rgba(0, 0, 0, 0.05) 0px 7px 25px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 3
    "rgba(0, 0, 0, 0.05) 0px 8px 26px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 4
    "rgba(0, 0, 0, 0.05) 0px 9px 27px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 5
    "rgba(0, 0, 0, 0.05) 0px 10px 28px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 6
    "rgba(0, 0, 0, 0.05) 0px 11px 29px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 7
    "rgba(0, 0, 0, 0.05) 0px 12px 30px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 8
    "rgba(0, 0, 0, 0.05) 0px 13px 31px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 9
    "rgba(0, 0, 0, 0.05) 0px 14px 32px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 10
    "rgba(0, 0, 0, 0.05) 0px 15px 33px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 11
    "rgba(0, 0, 0, 0.05) 0px 16px 34px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 12
    "rgba(0, 0, 0, 0.05) 0px 17px 35px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 13
    "rgba(0, 0, 0, 0.05) 0px 18px 36px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 14
    "rgba(0, 0, 0, 0.05) 0px 19px 37px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 15
    "rgba(0, 0, 0, 0.05) 0px 20px 38px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 16
    "rgba(0, 0, 0, 0.05) 0px 21px 39px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 17
    "rgba(0, 0, 0, 0.05) 0px 22px 40px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 18
    "rgba(0, 0, 0, 0.05) 0px 23px 41px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 19
    "rgba(0, 0, 0, 0.05) 0px 24px 42px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 20
    "rgba(0, 0, 0, 0.05) 0px 25px 43px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 21
    "rgba(0, 0, 0, 0.05) 0px 26px 44px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 22
    "rgba(0, 0, 0, 0.05) 0px 27px 45px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 23
    "rgba(0, 0, 0, 0.05) 0px 28px 46px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px", // Shadow level 24
  ],

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
