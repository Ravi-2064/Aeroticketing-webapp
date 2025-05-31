import { PaymentTransactionRepository } from '../repositories/PaymentTransactionRepository';
import { BookingRepository } from '../repositories/BookingRepository';
import { CreatePaymentDto, UpdatePaymentDto, PaymentSearchDto } from '../validators/PaymentValidator';
import { PaymentTransaction } from '../entities/PaymentTransaction.entity';
import { AppError } from '../utils/AppError';

export class PaymentService {
  constructor(
    private paymentRepository: PaymentTransactionRepository,
    private bookingRepository: BookingRepository
  ) {}

  async createPayment(paymentData: CreatePaymentDto): Promise<PaymentTransaction> {
    const booking = await this.bookingRepository.findOne({ where: { id: paymentData.bookingId } });
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (booking.status === 'cancelled') {
      throw new AppError('Cannot process payment for cancelled booking', 400);
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: { booking: { id: booking.id }, status: 'completed' },
    });

    if (existingPayment) {
      throw new AppError('Payment already exists for this booking', 400);
    }

    if (paymentData.amount !== booking.totalPrice) {
      throw new AppError('Payment amount does not match booking total', 400);
    }

    const payment = await this.paymentRepository.createTransaction(paymentData);
    return payment;
  }

  async updatePayment(id: number, paymentData: UpdatePaymentDto): Promise<PaymentTransaction> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    if (payment.status === 'completed') {
      throw new AppError('Cannot update completed payment', 400);
    }

    const updatedPayment = await this.paymentRepository.updateTransactionStatus(id, paymentData.status || payment.status);
    return updatedPayment;
  }

  async getPaymentById(id: number): Promise<PaymentTransaction> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    return payment;
  }

  async getPaymentsByBooking(bookingId: number): Promise<PaymentTransaction[]> {
    const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    return this.paymentRepository.findByBookingId(bookingId);
  }

  async searchPayments(searchParams: PaymentSearchDto): Promise<PaymentTransaction[]> {
    if (searchParams.bookingId) {
      return this.paymentRepository.findByBookingId(searchParams.bookingId);
    }

    if (searchParams.status) {
      return this.paymentRepository.findByStatus(searchParams.status);
    }

    if (searchParams.startDate && searchParams.endDate) {
      return this.paymentRepository.findTransactionsByDateRange(searchParams.startDate, searchParams.endDate);
    }

    return [];
  }

  async processRefund(id: number): Promise<PaymentTransaction> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    if (payment.status !== 'completed') {
      throw new AppError('Only completed payments can be refunded', 400);
    }

    const booking = await this.bookingRepository.findOne({ where: { id: payment.booking.id } });
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (booking.status !== 'cancelled') {
      throw new AppError('Only cancelled bookings can be refunded', 400);
    }

    const updatedPayment = await this.paymentRepository.updateTransactionStatus(id, 'refunded');
    return updatedPayment;
  }
} 