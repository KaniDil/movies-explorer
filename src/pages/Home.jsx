import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { fetchTrendingMovies, searchMovies } from '../services/api';
import MovieCard from '../components/Movie/MovieCard';
import SearchBar from '../components/Search/SearchBar';
import Filters from '../components/Search/Filters';
import { useFavorites } from '../context/FavoritesContext';
import { getGenres } from '../services/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: null,
    year: null,
    rating: null,
  });
  const { favorites, toggleFavorite } = useFavorites();

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      if (searchQuery.trim() === '') {
        data = await fetchTrendingMovies();
        setMovies(data);
      } else {
        const response = await searchMovies(searchQuery, page);
        data = response.results;
        setTotalPages(response.total_pages);
        if (page === 1) {
          setMovies(data);
        } else {
          setMovies((prev) => [...prev, ...data]);
        }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    // Implement filter logic here
  };

  const filteredMovies = movies.filter((movie) => {
    // Apply filters
    if (filters.genre && !movie.genre_ids.includes(filters.genre)) return false;
    if (filters.year && movie.release_date?.substring(0, 4) !== filters.year) return false;
    if (filters.rating && movie.vote_average < filters.rating) return false;
    return true;
  });

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Movies'}
      </Typography>
      
      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      <Filters onApplyFilters={applyFilters} genres={genres} />
      
      {loading && page === 1 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredMovies.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <MovieCard
                  movie={movie}
                  isFavorite={favorites.some((fav) => fav.id === movie.id)}
                  toggleFavorite={toggleFavorite}
                />
              </Grid>
            ))}
          </Grid>
          
          {page < totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} />}
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
      
      {!loading && filteredMovies.length === 0 && (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No movies found. Try a different search or filter.
        </Typography>
      )}
    </Box>
  );
};

export default Home;