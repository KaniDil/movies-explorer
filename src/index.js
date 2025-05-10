import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Updated import
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './components/Auth/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import App from './App';
import lightTheme from './styles/lightTheme';
import GlobalStyles from './styles/GlobalStyles';
import ErrorBoundary from './components/UI/ErrorBoundary';

// Create root
const root = createRoot(document.getElementById('root'));

// Render app
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <FavoritesProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <GlobalStyles />
              <App />
            </ThemeProvider>
          </FavoritesProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);

// Register service worker for PWA
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}