import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '../validators/UserValidator';
import { User } from '../entities/User.entity';
import { AppError } from '../utils/AppError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.createUser({
      ...userData,
      passwordHash: hashedPassword,
    });

    return user;
  }

  async login(loginData: LoginUserDto): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    return { user, token };
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new AppError('Email already registered', 400);
      }
    }

    const updatedUser = await this.userRepository.updateUser(id, userData);
    if (!updatedUser) {
      throw new AppError('Failed to update user', 500);
    }

    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.deleteUser(id);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async getUserWithBookings(id: number): Promise<User> {
    const user = await this.userRepository.findByIdWithBookings(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async getUserWithAuditLogs(id: number): Promise<User> {
    const user = await this.userRepository.findByIdWithAuditLogs(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
} 