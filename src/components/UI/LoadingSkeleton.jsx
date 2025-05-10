import React from 'react';
import { Box, Skeleton } from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <Box sx={{ position: 'relative' }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={300}
              sx={{ borderRadius: '12px' }}
            />
            <Box sx={{ p: 1 }}>
              <Skeleton width="80%" height={24} />
              <Skeleton width="60%" height={20} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Skeleton width="30%" height={20} />
                <Skeleton width="20%" height={20} />
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;