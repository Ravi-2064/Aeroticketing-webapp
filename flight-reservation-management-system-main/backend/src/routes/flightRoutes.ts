import { Router } from 'express';
import { FlightController } from '../controllers/FlightController';
import { FlightService } from '../services/FlightService';
import { FlightRepository } from '../repositories/FlightRepository';
import { AppDataSource } from '../config/database';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const flightRepository = AppDataSource.getRepository(Flight);
const flightService = new FlightService(flightRepository);
const flightController = new FlightController(flightService);

// Public routes
router.get('/', flightController.searchFlights.bind(flightController));
router.get('/upcoming', flightController.getUpcomingFlights.bind(flightController));
router.get('/status/:status', flightController.getFlightsByStatus.bind(flightController));
router.get('/:id', flightController.getFlight.bind(flightController));

// Admin only routes
router.use(authenticate);
router.use(authorize(['admin']));
router.post('/', flightController.createFlight.bind(flightController));
router.patch('/:id', flightController.updateFlight.bind(flightController));
router.delete('/:id', flightController.deleteFlight.bind(flightController));
router.patch('/:id/seats', flightController.updateAvailableSeats.bind(flightController));

export default router; 