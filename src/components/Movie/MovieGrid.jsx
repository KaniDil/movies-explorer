import React from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  CircularProgress,
  Button,
  Zoom,
  useScrollTrigger,
  Fade
} from '@mui/material';
import MovieCard from './MovieCard';
import { styled } from '@mui/material/styles';
import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollTopButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
  minWidth: 'unset',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  boxShadow: theme.shadows-6,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.1)'
  },
  transition: 'all 0.3s ease'
}));

const MovieGrid = ({ 
  movies, 
  loading, 
  hasMore, 
  onLoadMore, 
  favorites,
  toggleFavorite 
}) => {
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading && movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!loading && movies.length === 0) {
    return (
      <Fade in={true}>
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h5" color="text.secondary">
            No movies found
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Try adjusting your search or filters
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <Grid 
            item 
            xs={6} 
            sm={4} 
            md={3} 
            lg={2} 
            key={`${movie.id}-${index}`}
          >
            <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
              <div>
                <MovieCard
                  movie={movie}
                  isFavorite={favorites.some(fav => fav.id === movie.id)}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {loading && movies.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {hasMore && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={onLoadMore}
            sx={{
              borderRadius: '20px',
              px: 4,
              py: 1,
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Load More Movies
          </Button>
        </Box>
      )}

      <Zoom in={trigger}>
        <ScrollTopButton 
          onClick={handleScrollTop}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp fontSize="large" />
        </ScrollTopButton>
      </Zoom>
    </Box>
  );
};

export default MovieGrid;