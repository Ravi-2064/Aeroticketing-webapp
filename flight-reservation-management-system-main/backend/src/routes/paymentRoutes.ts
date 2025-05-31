import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { PaymentService } from '../services/PaymentService';
import { PaymentTransactionRepository } from '../repositories/PaymentTransactionRepository';
import { AppDataSource } from '../config/database';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const paymentRepository = AppDataSource.getRepository(PaymentTransaction);
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

// Protected routes
router.use(authenticate);

// User routes
router.post('/', paymentController.createPayment.bind(paymentController));
router.get('/booking/:bookingId', paymentController.getPaymentsByBooking.bind(paymentController));
router.get('/:id', paymentController.getPayment.bind(paymentController));
router.post('/:id/refund', paymentController.processRefund.bind(paymentController));

// Admin routes
router.use(authorize(['admin']));
router.get('/', paymentController.searchPayments.bind(paymentController));
router.patch('/:id', paymentController.updatePayment.bind(paymentController));

export default router; 