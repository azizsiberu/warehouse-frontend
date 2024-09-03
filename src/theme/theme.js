// Path: /src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Primary color
    },
    secondary: {
      main: '#FFC228', // Secondary color
    },
    success: {
      main: '#2A9928', // Green color
    },
    warning: {
      main: '#F4B63C', // Yellow color
    },
    error: {
      main: '#FF2E2E', // Red/Error color
    },
    neutral: {
      main: '#241F1C', // Dark/Neutral color
    },
  },
  typography: {
    fontFamily: 'Open Sans, Raleway, Arial',
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Raleway',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Raleway',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Raleway',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Raleway',
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
    },
  },
});

export default theme;
