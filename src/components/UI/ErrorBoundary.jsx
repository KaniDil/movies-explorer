import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import { SentimentVeryDissatisfied, Refresh } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  marginTop: theme.spacing(8),
  textAlign: 'center',
  padding: theme.spacing(4),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #2a2a2a, #1a1a1a)'
    : 'linear-gradient(135deg, #f5f5f5, #ffffff)',
  boxShadow: theme.shadows[10],
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <StyledCard>
          <CardContent>
            <SentimentVeryDissatisfied 
              sx={{ 
                fontSize: 72, 
                color: 'error.main',
                mb: 2
              }} 
            />
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We're sorry for the inconvenience. The app encountered an unexpected error.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={this.handleRefresh}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 'bold'
              }}
            >
              Refresh Page
            </Button>
          </CardContent>
        </StyledCard>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;