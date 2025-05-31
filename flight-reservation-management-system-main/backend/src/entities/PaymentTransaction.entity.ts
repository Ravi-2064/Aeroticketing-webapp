import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Booking } from './Booking.entity';

@Entity('payment_transactions')
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Booking, booking => booking.payments)
  booking: Booking;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'payment_method' })
  paymentMethod: string;

  @Column()
  status: string;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 