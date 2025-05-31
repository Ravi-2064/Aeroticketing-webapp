import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  Chip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getBookings, cancelBooking, clearError } from '../store/slices/bookingsSlice';
import LoadingSkeleton from '../components/LoadingSkeleton';

const BookingHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Booking History
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}
          {loading ? (
            <LoadingSkeleton type="booking" />
          ) : bookings.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ mt: 4 }}>
              No bookings found.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {bookings.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="h6">
                            {booking.flight.flightNumber}
                          </Typography>
                          <Typography color="textSecondary">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle1">
                            {booking.flight.departureCity}
                          </Typography>
                          <Typography color="textSecondary">
                            {new Date(booking.flight.departureTime).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle1">
                            {booking.flight.arrivalCity}
                          </Typography>
                          <Typography color="textSecondary">
                            {new Date(booking.flight.arrivalTime).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Chip
                              label={booking.status}
                              color={getStatusColor(booking.status) as any}
                              size="small"
                            />
                            <Typography variant="body2">
                              Seat: {booking.seatNumber}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      {booking.status === 'CONFIRMED' && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default BookingHistory; 