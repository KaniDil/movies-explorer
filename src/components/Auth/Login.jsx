import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Divider, 
  InputAdornment, 
  IconButton,
  Fade,
  Slide,
  Paper,
  Avatar,
} from '@mui/material';
import { 
  LockOutlined, 
  Visibility, 
  VisibilityOff,
  MovieFilter
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: theme.shadows[10],
  maxWidth: '450px',
  margin: 'auto',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' 
    : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    transform: 'scale(1.02)'
  }
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/movie-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2
      }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <StyledPaper elevation={6}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar sx={{ 
              width: 60, 
              height: 60, 
              margin: 'auto',
              bgcolor: 'primary.main',
              boxShadow: 3
            }}>
              <MovieFilter fontSize="large" />
            </Avatar>
            <Typography variant="h4" component="h1" sx={{ mt: 2, fontWeight: 'bold' }}>
              Movie Explorer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover your next favorite film
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />

            {error && (
              <Fade in={error !== ''}>
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              </Fade>
            )}

            <StyledButton
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </StyledButton>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              New to Movie Explorer?
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            sx={{ 
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none'
            }}
            onClick={() => navigate('/register')}
          >
            Create an account
          </Button>
        </StyledPaper>
      </Slide>
    </Box>
  );
};



export default Login;