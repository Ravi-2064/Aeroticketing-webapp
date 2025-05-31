import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingsAPI } from '../../services/api';

interface Booking {
  id: number;
  userId: number;
  flightId: number;
  status: string;
  seatNumber: string;
  bookingDate: string;
  totalAmount: number;
}

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

export const getBookings = createAsyncThunk(
  'bookings/getBookings',
  async () => {
    const response = await bookingsAPI.getAll();
    return response.data.data.bookings;
  }
);

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async () => {
    const response = await bookingsAPI.getUserBookings();
    return response.data.data.bookings;
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id: number) => {
    const response = await bookingsAPI.cancel(id);
    return response.data.data.booking;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to cancel booking';
      });
  },
});

export const { clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;