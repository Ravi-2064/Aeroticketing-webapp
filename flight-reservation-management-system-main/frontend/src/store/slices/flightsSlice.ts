import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { flightsAPI } from '../../services/api';

interface Flight {
  id: number;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  status: string;
}

interface FlightsState {
  flights: Flight[];
  selectedFlight: Flight | null;
  loading: boolean;
  error: string | null;
}

const initialState: FlightsState = {
  flights: [],
  selectedFlight: null,
  loading: false,
  error: null,
};

export const searchFlights = createAsyncThunk(
  'flights/searchFlights',
  async (params: any) => {
    const response = await flightsAPI.search(params);
    return response.data.data.flights;
  }
);

export const fetchUpcomingFlights = createAsyncThunk(
  'flights/fetchUpcomingFlights',
  async () => {
    const response = await flightsAPI.getUpcoming();
    return response.data.data.flights;
  }
);

export const getFlightDetails = createAsyncThunk(
  'flights/getFlightDetails',
  async (id: number) => {
    const response = await flightsAPI.getById(id);
    return response.data.data.flight;
  }
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    clearSelectedFlight: (state) => {
      state.selectedFlight = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search flights';
      })
      .addCase(fetchUpcomingFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(fetchUpcomingFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch upcoming flights';
      })
      .addCase(getFlightDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFlightDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFlight = action.payload;
      })
      .addCase(getFlightDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch flight details';
      });
  },
});

export const { clearSelectedFlight, clearError } = flightsSlice.actions;
export default flightsSlice.reducer;