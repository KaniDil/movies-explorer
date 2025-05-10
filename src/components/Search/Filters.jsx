import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import {
  ExpandMore,
  FilterAlt,
  FilterAltOff,
  Star,
  CalendarToday,
  Theaters
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: '12px !important',
  overflow: 'hidden',
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
}));

const FilterHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.05)',
  borderRadius: '12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.08)',
  },
}));

const FilterChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '8px',
}));

const Filters = ({ onApplyFilters, genres = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    genre: null,
    year: null,
    rating: null,
  });

  // Generate recent years (last 30 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleGenreChange = (event) => {
    setFilters({ ...filters, genre: event.target.value });
  };

  const handleYearChange = (event) => {
    setFilters({ ...filters, year: event.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setFilters({ ...filters, rating: newValue });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setExpanded(false);
  };

  const resetFilters = () => {
    const resetFilters = { genre: null, year: null, rating: null };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const hasActiveFilters = filters.genre || filters.year || filters.rating;

  return (
    <Box sx={{ mb: 3 }}>
      <FilterHeader onClick={() => setExpanded(!expanded)}>
        <FilterAlt color="primary" sx={{ mr: 1 }} />
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>
        {hasActiveFilters && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {filters.genre && (
              <FilterChip
                label={`Genre: ${genres.find(g => g.id === filters.genre)?.name}`}
                size="small"
                onDelete={() => setFilters({ ...filters, genre: null })}
              />
            )}
            {filters.year && (
              <FilterChip
                label={`Year: ${filters.year}`}
                size="small"
                onDelete={() => setFilters({ ...filters, year: null })}
              />
            )}
            {filters.rating && (
              <FilterChip
                label={`Rating: ${filters.rating}+`}
                size="small"
                onDelete={() => setFilters({ ...filters, rating: null })}
              />
            )}
          </Box>
        )}
        <IconButton size="small" sx={{ ml: 1 }}>
          <ExpandMore sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </IconButton>
      </FilterHeader>

      <Collapse in={expanded}>
        <StyledAccordion expanded={expanded}>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Theaters sx={{ mr: 1, fontSize: '1rem' }} /> Genre
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Select Genre</InputLabel>
                <Select
                  value={filters.genre || ''}
                  onChange={handleGenreChange}
                  label="Select Genre"
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ mr: 1, fontSize: '1rem' }} /> Release Year
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Select Year</InputLabel>
                <Select
                  value={filters.year || ''}
                  onChange={handleYearChange}
                  label="Select Year"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ mr: 1, fontSize: '1rem' }} /> Minimum Rating
              </Typography>
              <Slider
                value={filters.rating || 0}
                onChange={handleRatingChange}
                aria-labelledby="rating-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                ]}
                min={0}
                max={10}
                sx={{
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: 'primary.main',
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={resetFilters}
                startIcon={<FilterAltOff />}
                color="error"
                variant="outlined"
                size="small"
                disabled={!hasActiveFilters}
              >
                Reset
              </Button>
              <Button
                onClick={applyFilters}
                startIcon={<FilterAlt />}
                color="primary"
                variant="contained"
                size="small"
                sx={{ boxShadow: 'none' }}
              >
                Apply Filters
              </Button>
            </Box>
          </AccordionDetails>
        </StyledAccordion>
      </Collapse>
    </Box>
  );
};

export default Filters;