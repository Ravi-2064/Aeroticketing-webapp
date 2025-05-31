import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/User.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async findByIdWithBookings(id: number): Promise<User | undefined> {
    return this.findOne({
      where: { id },
      relations: ['bookings', 'bookings.flight'],
    });
  }

  async findByIdWithAuditLogs(id: number): Promise<User | undefined> {
    return this.findOne({
      where: { id },
      relations: ['auditLogs'],
    });
  }

  async findByRole(role: string): Promise<User[]> {
    return this.find({ where: { role } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    await this.update(id, userData);
    return this.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }
} 