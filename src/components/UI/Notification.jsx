import { Typography } from '@mui/material';
import React from 'react';
import { 
  Snackbar, 
  Alert, 
  IconButton,
  Slide,
  useTheme
} from '@mui/material';
import { 
  Close,
  CheckCircle,
  Error,
  Info,
  Warning
} from '@mui/icons-material';

const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

const Notification = ({ 
  open, 
  onClose, 
  message, 
  severity = 'info',
  autoHideDuration = 6000
}) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (severity) {
      case 'success':
        return <CheckCircle fontSize="small" />;
      case 'error':
        return <Error fontSize="small" />;
      case 'warning':
        return <Warning fontSize="small" />;
      default:
        return <Info fontSize="small" />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px !important',
          boxShadow: theme.shadows[6]
        }
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        icon={getIcon()}
        sx={{
          width: '100%',
          alignItems: 'center',
          '& .MuiAlert-message': {
            padding: '8px 0'
          }
        }}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={onClose}
            sx={{
              opacity: 0.8,
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Typography variant="body2" fontWeight="medium">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

// Add this new hook
export const useSnackbar = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('info');

  const showSnackbar = (msg, sev = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return { showSnackbar };
};

// Keep your existing default export
export default Notification;