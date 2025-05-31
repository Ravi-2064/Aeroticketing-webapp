import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/PaymentService';
import { CreatePaymentDto, UpdatePaymentDto, PaymentSearchDto } from '../validators/PaymentValidator';
import { AppError } from '../utils/AppError';

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  async createPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paymentData: CreatePaymentDto = req.body;
      const payment = await this.paymentService.createPayment(paymentData);
      res.status(201).json({
        status: 'success',
        data: { payment },
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const paymentData: UpdatePaymentDto = req.body;
      const payment = await this.paymentService.updatePayment(Number(id), paymentData);
      res.status(200).json({
        status: 'success',
        data: { payment },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.getPaymentById(Number(id));
      res.status(200).json({
        status: 'success',
        data: { payment },
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentsByBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookingId } = req.params;
      const payments = await this.paymentService.getPaymentsByBooking(Number(bookingId));
      res.status(200).json({
        status: 'success',
        data: { payments },
      });
    } catch (error) {
      next(error);
    }
  }

  async searchPayments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchParams: PaymentSearchDto = req.query as any;
      const payments = await this.paymentService.searchPayments(searchParams);
      res.status(200).json({
        status: 'success',
        data: { payments },
      });
    } catch (error) {
      next(error);
    }
  }

  async processRefund(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await this.paymentService.processRefund(Number(id));
      res.status(200).json({
        status: 'success',
        data: { payment },
      });
    } catch (error) {
      next(error);
    }
  }
} 