import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import flightsReducer from './slices/flightsSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    flights: flightsReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 