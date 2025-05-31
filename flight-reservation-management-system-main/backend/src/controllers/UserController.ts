import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '../validators/UserValidator';
import { AppError } from '../utils/AppError';

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData: LoginUserDto = req.body;
      const { user, token } = await this.userService.login(loginData);
      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const userData: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(userId, userData);
      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const user = await this.userService.getUserById(userId);
      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
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

      const user = await this.userService.getUserWithBookings(userId);
      res.status(200).json({
        status: 'success',
        data: {
          bookings: user.bookings,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const user = await this.userService.getUserWithAuditLogs(userId);
      res.status(200).json({
        status: 'success',
        data: {
          auditLogs: user.auditLogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }
} 