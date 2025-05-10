import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, IconButton, Paper, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
    '&.Mui-focused': {
      boxShadow: theme.shadows[6],
    },
  },
}));

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() !== '') {
        onSearch(query);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', my: 4 }}>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <Fade in={query.length > 0}>
              <InputAdornment position="end">
                <IconButton onClick={handleClear} edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            </Fade>
          ),
        }}
      />
      {isFocused && (
        <Fade in={isFocused}>
          <Paper
            elevation={0}
            sx={{
              mt: 1,
              p: 1,
              backgroundColor: 'transparent',
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: '0.8rem',
            }}
          >
            Try "Avengers", "Inception", or "Pulp Fiction"
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default SearchBar;