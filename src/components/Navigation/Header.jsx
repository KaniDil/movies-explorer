import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { 
  MovieFilter, 
  Search, 
  Favorite,
  Brightness4,
  Brightness7,
  AccountCircle
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { useAuth } from '../Auth/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(18, 18, 18, 0.8)' 
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
}));

const GrowTypography = styled(Typography)({
  flexGrow: 1,
  cursor: 'pointer',
  fontWeight: 'bold',
  letterSpacing: '1px',
  '&:hover': {
    opacity: 0.8
  }
});

const Header = ({ darkMode, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const trigger = useScrollTrigger({
    threshold: 50,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <StyledAppBar position="sticky">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <MovieFilter fontSize="large" color="primary" />
          </Box>
          
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button>Home</Button>
            </Link>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton 
            color="inherit" 
            onClick={() => navigate('/search')}
            sx={{ mx: 1 }}
          >
            <Search />
          </IconButton>

          <IconButton 
            color="inherit" 
            onClick={() => navigate('/favorites')}
            sx={{ mx: 1 }}
          >
            <Badge badgeContent={favorites.length} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

          {user ? (
            <>
              <IconButton
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  <AccountCircle sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Typography color="error">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              component={Link}
              to="/login"
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </StyledAppBar>
    </Slide>
  );
};
export default Header;