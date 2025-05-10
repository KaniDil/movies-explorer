import React, { createContext, useContext, useMemo, useEffect } from 'react';
import Notification, { useSnackbar } from '../components/UI/Notification';
import storage from '../services/localStorage';
import { useNavigate } from 'react-router-dom';

// Create context with default values
const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
  clearFavorites: () => {},
  isFavorite: () => false,
});

/**
 * Custom hook for accessing favorites context
 * @returns {{
 *   favorites: Array,
 *   toggleFavorite: (movie: Object) => void,
 *   clearFavorites: () => void,
 *   isFavorite: (id: number) => boolean
 * }}
 */
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = React.useState([]);
  const { showSnackbar } = useSnackbar();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadedFavorites = storage.getFavorites();
    setFavorites(loadedFavorites);
  }, []);

  /**
   * Toggle a movie in favorites
   * @param {Object} movie - The movie object to toggle
   */
  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);
      let newFavorites;

      if (isAlreadyFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.id !== movie.id);
        showSnackbar(`${movie.title} removed from favorites`, 'info');
      } else {
        newFavorites = [...prevFavorites, {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          addedAt: new Date().toISOString()
        }];
        showSnackbar(`${movie.title} added to favorites!`, 'success');
      }

      storage.saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
    storage.saveFavorites([]);
    showSnackbar('All favorites cleared', 'warning');
  };

  /**
   * Check if a movie is favorite
   * @param {number} id - Movie ID
   * @returns {boolean}
   */
  const isFavorite = (id) => favorites.some(fav => fav.id === id);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    favorites,
    toggleFavorite,
    clearFavorites,
    isFavorite,
  }), [favorites]);

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Add display name for debugging
FavoritesProvider.displayName = 'FavoritesProvider';