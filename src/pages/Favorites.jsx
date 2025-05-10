import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Button,
  Paper,
  Avatar,
  useTheme
} from '@mui/material';
import { 
  Favorite,
  MovieFilter,
  SentimentDissatisfied
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MovieGrid from '../components/Movie/MovieGrid';
import { useFavorites } from '../context/FavoritesContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: 500,
  textAlign: 'center',
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1e1e1e, #2a2a2a)'
    : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
  boxShadow: theme.shadows[5],
}));

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        justifyContent: 'space-between'
      }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
          <Favorite color="error" sx={{ mr: 1, fontSize: '1.5em' }} />
          Your Favorite Movies
        </Typography>
        {favorites.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={clearFavorites}
            sx={{ 
              borderRadius: '12px',
              px: 3,
              py: 1
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {favorites.length > 0 ? (
        <MovieGrid
          movies={favorites}
          loading={false}
          hasMore={false}
          onLoadMore={() => {}}
          favorites={favorites}
          toggleFavorite={() => {}}
        />
      ) : (
        <StyledPaper elevation={3}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            margin: 'auto',
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.1)',
            mb: 3
          }}>
            <SentimentDissatisfied fontSize="large" />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            No Favorites Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't added any movies to your favorites. Start exploring and add some!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/"
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            <MovieFilter sx={{ mr: 1 }} />
            Browse Movies
          </Button>
        </StyledPaper>
      )}
    </Box>
  );
};

export default Favorites;