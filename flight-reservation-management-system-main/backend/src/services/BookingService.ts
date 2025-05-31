import { BookingRepository } from '../repositories/BookingRepository';
import { FlightRepository } from '../repositories/FlightRepository';
import { UserRepository } from '../repositories/UserRepository';
import { CreateBookingDto, UpdateBookingDto, BookingSearchDto } from '../validators/BookingValidator';
import { Booking } from '../entities/Booking.entity';
import { AppError } from '../utils/AppError';

export class BookingService {
  constructor(
    private bookingRepository: BookingRepository,
    private flightRepository: FlightRepository,
    private userRepository: UserRepository
  ) {}

  async createBooking(bookingData: CreateBookingDto): Promise<Booking> {
    const user = await this.userRepository.findOne({ where: { id: bookingData.userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const flight = await this.flightRepository.findOne({ where: { id: bookingData.flightId } });
    if (!flight) {
      throw new AppError('Flight not found', 404);
    }

    if (flight.availableSeats <= 0) {
      throw new AppError('No available seats on this flight', 400);
    }

    if (flight.status !== 'scheduled') {
      throw new AppError('Flight is not available for booking', 400);
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        flight: { id: flight.id },
        seatNumber: bookingData.seatNumber,
      },
    });

    if (existingBooking) {
      throw new AppError('Seat is already booked', 400);
    }

    const booking = await this.bookingRepository.createBooking(bookingData);
    await this.flightRepository.updateAvailableSeats(flight.id, -1);

    return booking;
  }

  async updateBooking(id: number, bookingData: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (bookingData.seatNumber) {
      const existingBooking = await this.bookingRepository.findOne({
        where: {
          flight: { id: booking.flight.id },
          seatNumber: bookingData.seatNumber,
        },
      });

      if (existingBooking && existingBooking.id !== id) {
        throw new AppError('Seat is already booked', 400);
      }
    }

    const updatedBooking = await this.bookingRepository.updateBookingStatus(id, bookingData.status || booking.status);
    return updatedBooking;
  }

  async cancelBooking(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id } });
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    if (booking.status === 'cancelled') {
      throw new AppError('Booking is already cancelled', 400);
    }

    const updatedBooking = await this.bookingRepository.updateBookingStatus(id, 'cancelled');
    await this.flightRepository.updateAvailableSeats(booking.flight.id, 1);

    return updatedBooking;
  }

  async getBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findBookingWithDetails(id);
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    return booking;
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return this.bookingRepository.findUserBookings(userId);
  }

  async searchBookings(searchParams: BookingSearchDto): Promise<Booking[]> {
    if (searchParams.userId) {
      return this.bookingRepository.findUserBookings(searchParams.userId);
    }

    if (searchParams.flightId) {
      return this.bookingRepository.findFlightBookings(searchParams.flightId);
    }

    if (searchParams.startDate && searchParams.endDate) {
      return this.bookingRepository.findBookingsByDateRange(searchParams.startDate, searchParams.endDate);
    }

    if (searchParams.status) {
      return this.bookingRepository.findBookingsByStatus(searchParams.status);
    }

    return [];
  }
} 