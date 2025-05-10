import { Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Modal, IconButton, CircularProgress } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CloseIcon from '@mui/icons-material/Close';
import { getMovieDetails } from '../../services/api';

const MovieTrailer = ({ movieId }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTrailer = async () => {
    try {
      setLoading(true);
      const movieDetails = await getMovieDetails(movieId);
      const trailer = movieDetails.videos?.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [movieId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!trailerKey) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Trailer
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover .play-button': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={handleOpen}
      >
        <img
          src={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
          alt="Trailer Thumbnail"
          style={{ width: '100%', display: 'block' }}
        />
        <Box
          className="play-button"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 0.3s ease',
            color: 'white',
          }}
        >
          <PlayCircleFilledIcon sx={{ fontSize: '64px' }} />
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            outline: 'none',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default MovieTrailer;