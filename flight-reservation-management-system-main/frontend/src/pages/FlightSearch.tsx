import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { searchFlights, clearError } from '../store/slices/flightsSlice';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { validateCity, validateDate } from '../utils/validation';

interface SearchFormData {
  departureCity: string;
  arrivalCity: string;
  departureDate: Date | null;
  passengers: number;
}

interface SearchFormErrors {
  departureCity?: string;
  arrivalCity?: string;
  departureDate?: string;
}

const FlightSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { flights, loading, error } = useAppSelector((state) => state.flights);
  const [formData, setFormData] = useState<SearchFormData>({
    departureCity: '',
    arrivalCity: '',
    departureDate: null,
    passengers: 1,
  });
  const [errors, setErrors] = useState<SearchFormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      departureDate: date,
    }));
    setErrors((prev) => ({
      ...prev,
      departureDate: undefined,
    }));
  };

  const handlePassengersChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({
      ...prev,
      passengers: e.target.value as number,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: SearchFormErrors = {
      departureCity: validateCity(formData.departureCity),
      arrivalCity: validateCity(formData.arrivalCity),
      departureDate: validateDate(formData.departureDate),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(searchFlights({
      departureCity: formData.departureCity,
      arrivalCity: formData.arrivalCity,
      departureDate: formData.departureDate?.toISOString() || '',
      passengers: formData.passengers,
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Search Flights
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="From"
                  name="departureCity"
                  value={formData.departureCity}
                  onChange={handleInputChange}
                  error={!!errors.departureCity}
                  helperText={errors.departureCity}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="To"
                  name="arrivalCity"
                  value={formData.arrivalCity}
                  onChange={handleInputChange}
                  error={!!errors.arrivalCity}
                  helperText={errors.arrivalCity}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <DatePicker
                  label="Departure Date"
                  value={formData.departureDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.departureDate,
                      helperText: errors.departureDate,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Passengers</InputLabel>
                  <Select
                    value={formData.passengers}
                    label="Passengers"
                    onChange={handlePassengersChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={loading}
                >
                  Search Flights
                </Button>
              </Grid>
            </Grid>
          </form>

          {loading ? (
            <LoadingSkeleton type="flight" />
          ) : flights.length > 0 ? (
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {flights.map((flight) => (
                <Grid item xs={12} key={flight.id}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="h6">
                            {flight.flightNumber}
                          </Typography>
                          <Typography color="textSecondary">
                            {new Date(flight.departureTime).toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle1">
                            {flight.departureCity}
                          </Typography>
                          <Typography color="textSecondary">
                            {flight.departureAirport}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="subtitle1">
                            {flight.arrivalCity}
                          </Typography>
                          <Typography color="textSecondary">
                            {flight.arrivalAirport}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="h6" color="primary">
                            ${flight.price}
                          </Typography>
                          <Typography color="textSecondary">
                            {flight.availableSeats} seats left
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          // Handle booking
                        }}
                      >
                        Book Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center" sx={{ mt: 4 }}>
              No flights found. Please try different search criteria.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default FlightSearch; 