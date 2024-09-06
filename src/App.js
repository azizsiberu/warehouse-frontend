// path: /src/App.js
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";
import { CssBaseline } from "@mui/material";
import * as Sentry from "@sentry/react";

// Inisialisasi Sentry hanya jika dalam mode produksi
if (
  process.env.REACT_APP_ENV === "production" &&
  process.env.REACT_APP_SENTRY_DSN
) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
