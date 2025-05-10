import { GlobalStyles as MuiGlobalStyles, useTheme } from '@mui/material';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <MuiGlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: '100vh',
          overflowX: 'hidden',
        },
        '#root': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        },
        '::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '::-webkit-scrollbar-track': {
          background: theme.palette.mode === 'light' 
            ? '#f1f1f1' 
            : '#2a2a2a',
        },
        '::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'light' 
            ? theme.palette.primary.light 
            : theme.palette.primary.dark,
          borderRadius: 4,
          '&:hover': {
            background: theme.palette.primary.main,
          },
        },
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        '.fade-in': {
          animation: 'fadeIn 0.5s ease-in-out',
        },
        '.page-content': {
          flex: 1,
          padding: theme.spacing(4),
          [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
          },
        },
        '.movie-poster': {
          position: 'relative',
          '&:hover::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${theme.palette.common.black} 0%, transparent 50%)`,
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          },
        },
      }}
    />
  );
};

export default GlobalStyles;