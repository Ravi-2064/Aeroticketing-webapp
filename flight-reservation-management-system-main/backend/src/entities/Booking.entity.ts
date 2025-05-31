import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { Flight } from './Flight.entity';
import { PaymentTransaction } from './PaymentTransaction.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Flight, flight => flight.bookings)
  flight: Flight;

  @Column({ name: 'booking_date', type: 'timestamp with time zone' })
  bookingDate: Date;

  @Column({ name: 'seat_number' })
  seatNumber: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => PaymentTransaction, transaction => transaction.booking)
  payments: PaymentTransaction[];
} 