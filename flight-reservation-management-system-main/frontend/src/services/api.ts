import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Bookings API
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  getById: (id: number) => api.get(`/bookings/${id}`),
  create: (data: any) => api.post('/bookings', data),
  update: (id: number, data: any) => api.patch(`/bookings/${id}`, data),
  cancel: (id: number) => api.post(`/bookings/${id}/cancel`),
  getUserBookings: () => api.get('/bookings/my-bookings'),
};

// Flights API
export const flightsAPI = {
  getAll: () => api.get('/flights'),
  getById: (id: number) => api.get(`/flights/${id}`),
  search: (params: any) => api.get('/flights', { params }),
  getUpcoming: () => api.get('/flights/upcoming'),
  getByStatus: (status: string) => api.get(`/flights/status/${status}`),
};

// Payments API
export const paymentsAPI = {
  create: (data: any) => api.post('/payments', data),
  getById: (id: number) => api.get(`/payments/${id}`),
  getByBooking: (bookingId: number) => api.get(`/payments/booking/${bookingId}`),
  processRefund: (id: number) => api.post(`/payments/${id}/refund`),
};

export default api;