import { createTheme } from '@mui/material/styles';
import { red, orange, blue, green } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    secondary: {
      main: orange[500],
      light: orange[300],
      dark: orange[700],
      contrastText: '#ffffff',
    },
    error: {
      main: red[500],
      light: red[300],
      dark: red[700],
    },
    success: {
      main: green[500],
      light: green[300],
      dark: green[700],
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
      disabled: '#adb5bd',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    movieCard: {
      background: '#ffffff',
      hoverShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
    },
  },
  typography: {
    fontFamily: [
      '"Poppins"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default lightTheme;