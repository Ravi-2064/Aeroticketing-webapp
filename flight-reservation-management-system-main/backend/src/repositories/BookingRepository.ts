import { Repository, EntityRepository, Between } from 'typeorm';
import { Booking } from '../entities/Booking.entity';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async findUserBookings(userId: number): Promise<Booking[]> {
    return this.find({
      where: { user: { id: userId } },
      relations: ['flight', 'payments'],
      order: { bookingDate: 'DESC' },
    });
  }

  async findBookingWithDetails(id: number): Promise<Booking | undefined> {
    return this.findOne({
      where: { id },
      relations: ['user', 'flight', 'payments'],
    });
  }

  async findBookingsByDateRange(startDate: Date, endDate: Date): Promise<Booking[]> {
    return this.find({
      where: {
        bookingDate: Between(startDate, endDate),
      },
      relations: ['user', 'flight'],
    });
  }

  async findBookingsByStatus(status: string): Promise<Booking[]> {
    return this.find({
      where: { status },
      relations: ['user', 'flight'],
    });
  }

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = this.create(bookingData);
    return this.save(booking);
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    await this.update(id, { status });
    return this.findOne({ where: { id } });
  }

  async findFlightBookings(flightId: number): Promise<Booking[]> {
    return this.find({
      where: { flight: { id: flightId } },
      relations: ['user'],
    });
  }
} 