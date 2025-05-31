import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { AppDataSource } from '../config/database';
import { authenticate } from '../middleware/auth';

const router = Router();
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/register', userController.register.bind(userController));

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', userController.login.bind(userController));

// Protected routes
router.use(authenticate);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', userController.getProfile.bind(userController));

/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     tags: [Users]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Not authenticated
 */
router.patch('/profile', userController.updateProfile.bind(userController));

/**
 * @swagger
 * /api/users/bookings:
 *   get:
 *     tags: [Users]
 *     summary: Get user's bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's bookings retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/bookings', userController.getUserBookings.bind(userController));

/**
 * @swagger
 * /api/users/audit-logs:
 *   get:
 *     tags: [Users]
 *     summary: Get user's audit logs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's audit logs retrieved successfully
 *       401:
 *         description: Not authenticated
 */
router.get('/audit-logs', userController.getUserAuditLogs.bind(userController));

export default router; 