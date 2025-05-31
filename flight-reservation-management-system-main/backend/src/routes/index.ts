import { Router } from 'express';
import userRoutes from './userRoutes';
import flightRoutes from './flightRoutes';
import bookingRoutes from './bookingRoutes';
import paymentRoutes from './paymentRoutes';

const router = Router();

// API routes
router.use('/api/users', userRoutes);
router.use('/api/flights', flightRoutes);
router.use('/api/bookings', bookingRoutes);
router.use('/api/payments', paymentRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router; 