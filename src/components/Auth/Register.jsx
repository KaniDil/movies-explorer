import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  CircularProgress
} from '@mui/material';
import {
  LockOutlined,
  Person,
  Email,
  Visibility,
  VisibilityOff,
  MovieFilter
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: theme.shadows[15],
  maxWidth: '450px',
  margin: 'auto',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' 
    : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[20]
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
  color: 'white',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 5px 7px 3px rgba(33, 150, 243, .3)'
  }
}));

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setErrors({ server: err.message });
    } finally {
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
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/movie-bg.jpg)',
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
            <Typography variant="h4" component="h1" sx={{ 
              mt: 2, 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Join Movie Explorer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your account to save favorites
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
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
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
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
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
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

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                }
              }}
            />

            {errors.server && (
              <Fade in={!!errors.server}>
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.server}
                </Typography>
              </Fade>
            )}

            <GradientButton
              fullWidth
              type="submit"
              disabled={isLoading}
              endIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </GradientButton>
          </form>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/login"
            sx={{ 
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none'
            }}
          >
            Sign In Instead
          </Button>
        </StyledPaper>
      </Slide>
    </Box>
  );
};

export default Register;