import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/BookingService';
import { CreateBookingDto, UpdateBookingDto, BookingSearchDto } from '../validators/BookingValidator';
import { AppError } from '../utils/AppError';

export class BookingController {
  constructor(private bookingService: BookingService) {}

  async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const bookingData: CreateBookingDto = {
        ...req.body,
        userId,
      };
      const booking = await this.bookingService.createBooking(bookingData);
      res.status(201).json({
        status: 'success',
        data: { booking },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const bookingData: UpdateBookingDto = req.body;
      const booking = await this.bookingService.updateBooking(Number(id), bookingData);
      res.status(200).json({
        status: 'success',
        data: { booking },
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.cancelBooking(Number(id));
      res.status(200).json({
        status: 'success',
        data: { booking },
      });
    } catch (error) {
      next(error);
    }
  }

  async getBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await this.bookingService.getBookingById(Number(id));
      res.status(200).json({
        status: 'success',
        data: { booking },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const bookings = await this.bookingService.getUserBookings(userId);
      res.status(200).json({
        status: 'success',
        data: { bookings },
      });
    } catch (error) {
      next(error);
    }
  }

  async searchBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const searchParams: BookingSearchDto = req.query as any;
      const bookings = await this.bookingService.searchBookings(searchParams);
      res.status(200).json({
        status: 'success',
        data: { bookings },
      });
    } catch (error) {
      next(error);
    }
  }
} 