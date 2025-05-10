/**
 * Enhanced localStorage service with error handling and expiration support
 */

// Storage keys (centralized for easy management)
const STORAGE_KEYS = {
  USER: 'movieExplorer_user',
  FAVORITES: 'movieExplorer_favorites',
  THEME: 'movieExplorer_theme',
  RECENT_SEARCHES: 'movieExplorer_recent_searches'
};

// In your localStorage service
const FAVORITES_KEY = 'movieExplorer_favorites_v2'; // Versioned key

export const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
export const saveFavorites = (favorites) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

// Error class for storage operations
class StorageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Safely get item from localStorage with optional expiration check
 * @param {string} key 
 * @param {boolean} parse - Whether to parse JSON
 * @returns {any|null}
 */
const getItem = (key, parse = true) => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return null;

    // Handle expiration if the stored value has expiration metadata
    if (item.startsWith('__exp__')) {
      const { value, expires } = JSON.parse(item.substring(7));
      if (expires && Date.now() > expires) {
        removeItem(key);
        return null;
      }
      return parse ? value : JSON.stringify(value);
    }

    return parse ? JSON.parse(item) : item;
  } catch (error) {
    console.error(`Failed to get item from localStorage (key: ${key}):`, error);
    return null;
  }
};

/**
 * Safely set item in localStorage with optional expiration (in minutes)
 * @param {string} key 
 * @param {any} value 
 * @param {number|null} expiresInMinutes - Null for no expiration
 */
const setItem = (key, value, expiresInMinutes = null) => {
  try {
    let itemValue = value;
    
    if (expiresInMinutes) {
      const expires = Date.now() + expiresInMinutes * 60 * 1000;
      itemValue = `__exp__${JSON.stringify({ value, expires })}`;
    } else {
      itemValue = JSON.stringify(value);
    }

    window.localStorage.setItem(key, itemValue);
  } catch (error) {
    console.error(`Failed to set item in localStorage (key: ${key}):`, error);
    throw new StorageError('Failed to save data to storage');
  }
};

/**
 * Remove item from localStorage
 * @param {string} key 
 */
const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item from localStorage (key: ${key}):`, error);
  }
};

/**
 * Clear all app-related items from localStorage
 */
const clearAppData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      window.localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear app data from localStorage:', error);
    throw new StorageError('Failed to clear storage');
  }
};

/**
 * Get user data from localStorage
 * @returns {object|null}
 */
const getUser = () => getItem(STORAGE_KEYS.USER);

/**
 * Save user data to localStorage
 * @param {object} user 
 */
const saveUser = (user) => setItem(STORAGE_KEYS.USER, user);

/**
 * Remove user data from localStorage
 */
const removeUser = () => removeItem(STORAGE_KEYS.USER);

/**
 * Get theme preference from localStorage
 * @returns {string|null}
 */
const getThemePreference = () => getItem(STORAGE_KEYS.THEME, false);

/**
 * Save theme preference to localStorage
 * @param {string} theme - 'light' or 'dark'
 */
const saveThemePreference = (theme) => setItem(STORAGE_KEYS.THEME, theme, false);

/**
 * Get recent searches (with expiration)
 * @returns {array}
 */
const getRecentSearches = () => getItem(STORAGE_KEYS.RECENT_SEARCHES) || [];

/**
 * Save recent search (with 7 day expiration)
 * @param {string} query 
 */
const saveRecentSearch = (query) => {
  const searches = getRecentSearches();
  const updatedSearches = [query, ...searches.filter(s => s !== query)].slice(0, 5);
  setItem(STORAGE_KEYS.RECENT_SEARCHES, updatedSearches, 60 * 24 * 7); // 7 days
};

export default {
  // Core methods
  getItem,
  setItem,
  removeItem,
  clearAppData,

  // User methods
  getUser,
  saveUser,
  removeUser,

  // Favorites methods
  getFavorites,
  saveFavorites,

  // Theme methods
  getThemePreference,
  saveThemePreference,

  // Search methods
  getRecentSearches,
  saveRecentSearch,

  // Constants
  STORAGE_KEYS
};