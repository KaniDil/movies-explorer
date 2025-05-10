import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Divider, Chip, Button, Skeleton, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getMovieDetails, getMovieCredits, getSimilarMovies } from '../../services/api';
import MovieTrailer from './MovieTrailer';
import MovieCard from './MovieCard';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useFavorites } from '../../context/FavoritesContext';

const DetailContainer = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}));

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === parseInt(id));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [details, movieCredits, similar] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
        ]);
        setMovie(details);
        setCredits(movieCredits);
        setSimilarMovies(similar.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Box sx={{ mt: 2 }}>
          <Skeleton width="60%" height={40} />
          <Skeleton width="40%" height={30} />
          <Skeleton width="100%" height={100} />
        </Box>
      </Box>
    );
  }

  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  const director = credits?.crew.find((person) => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, 5);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <DetailContainer elevation={4}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: '200px', md: '400px' },
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
            },
          }}
        />
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} lg={3}>
              <Box
                sx={{
                  position: 'relative',
                  marginTop: { xs: 0, md: '-100px' },
                  boxShadow: 6,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  width: '100%',
                  height: 'auto',
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleFavorite(movie)}
                >
                  {isFavorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon color="error" />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Typography variant="h3" component="h1" gutterBottom>
                {movie.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                </Typography>
                <Chip
                  label={movie.release_date.substring(0, 4)}
                  sx={{ ml: 2 }}
                />
                <Chip
                  label={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                  sx={{ ml: 1 }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{ mr: 1, mb: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Typography variant="body1" paragraph>
                {movie.overview}
              </Typography>
              {director && (
                <Typography variant="body1" paragraph>
                  <strong>Director:</strong> {director.name}
                </Typography>
              )}
              {movie.tagline && (
                <Typography variant="body2" fontStyle="italic" color="text.secondary">
                  "{movie.tagline}"
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </DetailContainer>

      {mainCast && mainCast.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Cast
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {mainCast.map((person) => (
              <Grid item xs={6} sm={4} md={2} key={person.id}>
                <Box
                  sx={{
                    textAlign: 'center',
                    '& img': {
                      borderRadius: '50%',
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      marginBottom: '8px',
                    },
                  }}
                >
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                        : '/placeholder-avatar.jpg'
                    }
                    alt={person.name}
                  />
                  <Typography variant="subtitle2">{person.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {person.character}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <MovieTrailer movieId={id} />

      {similarMovies.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Similar Movies
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {similarMovies.map((similarMovie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={similarMovie.id}>
                <MovieCard
                  movie={similarMovie}
                  isFavorite={favorites.some((fav) => fav.id === similarMovie.id)}
                  toggleFavorite={toggleFavorite}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;