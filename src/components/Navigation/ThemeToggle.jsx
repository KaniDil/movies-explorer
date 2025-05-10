import React from 'react';
import { 
  IconButton,
  Tooltip,
  Box,
  useTheme
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Palette
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'rotate(15deg) scale(1.1)',
    color: theme.palette.mode === 'dark' 
      ? theme.palette.warning.light 
      : theme.palette.warning.dark
  }
}));

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  const theme = useTheme();

  return (
    <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
      <AnimatedIconButton 
        onClick={toggleTheme} 
        color="inherit"
        aria-label="toggle theme"
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: 24,
          height: 24
        }}>
          {darkMode ? (
            <Brightness7 sx={{ 
              position: 'absolute',
              color: theme.palette.warning.light
            }} />
          ) : (
            <Brightness4 sx={{ 
              position: 'absolute',
              color: theme.palette.warning.dark 
            }} />
          )}
          <Palette sx={{
            position: 'absolute',
            fontSize: '0.8em',
            color: theme.palette.text.secondary
          }} />
        </Box>
      </AnimatedIconButton>
    </Tooltip>
  );
};

export default ThemeToggle;