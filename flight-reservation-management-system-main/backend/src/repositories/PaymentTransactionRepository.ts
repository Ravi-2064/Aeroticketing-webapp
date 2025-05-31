import { Repository, EntityRepository, Between } from 'typeorm';
import { PaymentTransaction } from '../entities/PaymentTransaction.entity';

@EntityRepository(PaymentTransaction)
export class PaymentTransactionRepository extends Repository<PaymentTransaction> {
  async findByBookingId(bookingId: number): Promise<PaymentTransaction[]> {
    return this.find({
      where: { booking: { id: bookingId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByTransactionId(transactionId: string): Promise<PaymentTransaction | undefined> {
    return this.findOne({ where: { transactionId } });
  }

  async findByStatus(status: string): Promise<PaymentTransaction[]> {
    return this.find({
      where: { status },
      relations: ['booking'],
    });
  }

  async findTransactionsByDateRange(startDate: Date, endDate: Date): Promise<PaymentTransaction[]> {
    return this.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['booking'],
    });
  }

  async createTransaction(transactionData: Partial<PaymentTransaction>): Promise<PaymentTransaction> {
    const transaction = this.create(transactionData);
    return this.save(transaction);
  }

  async updateTransactionStatus(id: number, status: string): Promise<PaymentTransaction | undefined> {
    await this.update(id, { status });
    return this.findOne({ where: { id } });
  }
} 