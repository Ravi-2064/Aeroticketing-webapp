import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Booking } from './Booking.entity';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'flight_number', unique: true })
  flightNumber: string;

  @Column({ name: 'departure_city' })
  departureCity: string;

  @Column({ name: 'arrival_city' })
  arrivalCity: string;

  @Column({ name: 'departure_airport' })
  departureAirport: string;

  @Column({ name: 'arrival_airport' })
  arrivalAirport: string;

  @Column({ name: 'departure_time', type: 'timestamp with time zone' })
  departureTime: Date;

  @Column({ name: 'arrival_time', type: 'timestamp with time zone' })
  arrivalTime: Date;

  @Column({ name: 'total_seats' })
  totalSeats: number;

  @Column({ name: 'available_seats' })
  availableSeats: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'SCHEDULED' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Booking, booking => booking.flight)
  bookings: Booking[];
} 