import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography,
  Fade
} from '@mui/material';
import { MovieFilter } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Loading = ({ message = 'Loading movies...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        gap: 2
      }}
    >
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            animation: `${bounce} 1.5s infinite ease-in-out`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <MovieFilter 
            color="primary" 
            sx={{ 
              fontSize: 64,
              mb: 1
            }} 
          />
          <CircularProgress 
            thickness={4}
            size={60}
            color="primary"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-30px',
              marginLeft: '-30px'
            }}
          />
        </Box>
      </Fade>
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{
          mt: 2,
          fontWeight: 'medium'
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;