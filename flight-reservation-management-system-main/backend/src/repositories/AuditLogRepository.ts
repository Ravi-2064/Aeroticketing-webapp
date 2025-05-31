import { Repository, EntityRepository, Between } from 'typeorm';
import { AuditLog } from '../entities/AuditLog.entity';

@EntityRepository(AuditLog)
export class AuditLogRepository extends Repository<AuditLog> {
  async findByUserId(userId: number): Promise<AuditLog[]> {
    return this.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findByEntityType(entityType: string): Promise<AuditLog[]> {
    return this.find({
      where: { entityType },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByEntityId(entityType: string, entityId: number): Promise<AuditLog[]> {
    return this.find({
      where: { entityType, entityId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<AuditLog[]> {
    return this.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async createLog(logData: Partial<AuditLog>): Promise<AuditLog> {
    const log = this.create(logData);
    return this.save(log);
  }

  async findRecentLogs(limit: number = 100): Promise<AuditLog[]> {
    return this.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
} 