import axios from 'axios';

const API_KEY = '04ec8e82377535a525c4a09091b02bb0';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async (timeWindow = 'week') => {
  try {
    const response = await api.get(`/trending/movie/${timeWindow}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieCredits = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getSimilarMovies = async (id) => {
  try {
    const response = await api.get(`/movie/${id}/similar`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};