import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';
import { BookingService } from '../services/BookingService';
import { BookingRepository } from '../repositories/BookingRepository';
import { AppDataSource } from '../config/database';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const bookingRepository = AppDataSource.getRepository(Booking);
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService);

// Protected routes
router.use(authenticate);

// User routes
router.post('/', bookingController.createBooking.bind(bookingController));
router.get('/my-bookings', bookingController.getUserBookings.bind(bookingController));
router.get('/:id', bookingController.getBooking.bind(bookingController));
router.patch('/:id', bookingController.updateBooking.bind(bookingController));
router.post('/:id/cancel', bookingController.cancelBooking.bind(bookingController));

// Admin routes
router.use(authorize(['admin']));
router.get('/', bookingController.searchBookings.bind(bookingController));

export default router; 