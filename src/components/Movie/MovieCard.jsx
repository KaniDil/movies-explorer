import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Rating, Grow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
    '& .movie-poster': {
      '&::after': {
        opacity: 1,
      },
    },
  },
}));

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Grow in={true} timeout={800}>
      <StyledCard onClick={handleClick}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
            sx={{
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              padding: '4px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie);
            }}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </Box>
        </Box>
        <CardContent>
          <Typography variant="h6" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date?.substring(0, 4)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={movie.vote_average / 2}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {movie.genre_ids?.slice(0, 3).map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{ fontSize: '0.6rem' }}
              />
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    </Grow>
  );
};

export default MovieCard;