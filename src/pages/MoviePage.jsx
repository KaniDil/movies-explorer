import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  Chip, 
  Button, 
  Avatar,
  Paper,
  useTheme,
  Tabs,
  Tab,
  Skeleton
} from '@mui/material';
import { 
  Favorite,
  FavoriteBorder,
  ArrowBack,
  PlayCircle,
  Star,
  Theaters,
  People,
  Info
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { getMovieDetails, getMovieCredits } from '../services/api';
import MovieTrailer from '../components/Movie/MovieTrailer';
import { useFavorites } from '../context/FavoritesContext';

const DetailSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' 
    ? 'rgba(30, 30, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
}));

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [details, movieCredits] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ]);
        setMovie(details);
        setCredits(movieCredits);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === parseInt(id));
  const director = credits?.crew.find((person) => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, 6);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Box sx={{ mt: 3 }}>
          <Skeleton width="60%" height={50} />
          <Skeleton width="40%" height={30} />
          <Skeleton width="100%" height={100} />
        </Box>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
        <Typography variant="h4">Movie not found</Typography>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, borderRadius: '12px' }}
      >
        Back
      </Button>

      <DetailSection elevation={3}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flexShrink: 0 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: theme.shadows[10],
                width: { xs: '100%', md: 300 },
                height: { xs: 'auto', md: 450 }
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 2,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }}
                onClick={() => toggleFavorite(movie)}
              >
                {isFavorite ? (
                  <Favorite color="error" fontSize="medium" />
                ) : (
                  <FavoriteBorder color="error" fontSize="medium" />
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {movie.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star color="warning" sx={{ mr: 0.5 }} />
                <Typography>
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                </Typography>
              </Box>
              <Chip label={movie.release_date.substring(0, 4)} />
              <Chip label={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`} />
            </Box>

            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              ))}
            </Box>

            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {movie.overview}
            </Typography>

            {movie.tagline && (
              <Typography variant="body2" fontStyle="italic" color="text.secondary" sx={{ mb: 3 }}>
                "{movie.tagline}"
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayCircle />}
              sx={{ 
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 'bold'
              }}
              onClick={() => {
                const trailer = movie.videos?.results.find(v => v.type === 'Trailer');
                if (trailer) {
                  window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                }
              }}
            >
              Watch Trailer
            </Button>
          </Box>
        </Box>
      </DetailSection>

      <Tabs 
        value={activeTab} 
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Cast & Crew" icon={<People />} />
        <Tab label="Trailer" icon={<Theaters />} />
        <Tab label="Details" icon={<Info />} />
      </Tabs>

      {activeTab === 0 && mainCast && (
        <DetailSection elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Cast & Crew
          </Typography>
          {director && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Director
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={director.profile_path 
                    ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                    : undefined
                  }
                  sx={{ width: 60, height: 60 }}
                >
                  {director.name.charAt(0)}
                </Avatar>
                <Typography variant="body1">{director.name}</Typography>
              </Box>
            </Box>
          )}

          <Typography variant="subtitle1" gutterBottom>
            Main Cast
          </Typography>
          <Grid container spacing={3}>
            {mainCast.map((person) => (
              <Grid item xs={6} sm={4} md={3} key={person.id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : undefined
                    }
                    sx={{ width: 80, height: 80, mb: 1 }}
                  >
                    {person.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body1" align="center">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {person.character}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DetailSection>
      )}

      {activeTab === 1 && (
        <DetailSection elevation={3}>
          <MovieTrailer movieId={id} />
        </DetailSection>
      )}

      {activeTab === 2 && (
        <DetailSection elevation={3}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Movie Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Production Companies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {movie.production_companies.map((company) => (
                  <Chip
                    key={company.id}
                    label={company.name}
                    variant="outlined"
                    sx={{ borderRadius: '8px' }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Release Information
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {movie.status}
              </Typography>
              <Typography variant="body2">
                <strong>Original Language:</strong> {movie.original_language.toUpperCase()}
              </Typography>
              <Typography variant="body2">
                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </DetailSection>
      )}
    </Box>
  );
};

export default MoviePage;