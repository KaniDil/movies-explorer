import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import Header from './components/Navigation/Header';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import Login from './components/Auth/Login'; 
import Register from './components/Auth/Register';
import GlobalStyles from './styles/GlobalStyles';
import lightTheme from './styles/lightTheme';
import darkTheme from './styles/darkTheme';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <GlobalStyles />
      <AuthProvider>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;