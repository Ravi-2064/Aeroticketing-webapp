import React from 'react';
import { Skeleton, Card, CardContent, Grid, Box } from '@mui/material';

interface LoadingSkeletonProps {
  type: 'flight' | 'booking' | 'profile';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type }) => {
  if (type === 'flight') {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} key={item}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="40%" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="70%" height={24} />
                    <Skeleton variant="text" width="50%" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="70%" height={24} />
                    <Skeleton variant="text" width="50%" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="60%" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (type === 'booking') {
    return (
      <Grid container spacing={3}>
        {[1, 2].map((item) => (
          <Grid item xs={12} key={item}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="40%" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="70%" height={24} />
                    <Skeleton variant="text" width="50%" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="70%" height={24} />
                    <Skeleton variant="text" width="50%" />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Skeleton variant="text" width="40%" height={24} />
                    <Skeleton variant="text" width="60%" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (type === 'profile') {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height={56} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={56} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={120} />
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default LoadingSkeleton; 