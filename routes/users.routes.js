import express from 'express';
import {userLogin, userSignUp} from '../controller/users.controller.js';
import { body } from 'express-validator';
const router = express.Router();

/**
 * @swagger
 * /api/v1/users/create-user:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               fullName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 20
 *                 pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
 *                 example: Passw0rd123
 *                 description: Must be 8-20 characters, contain letters and numbers
 *               phone:
 *                 type: string
 *                 pattern: '^\\d{10}$'
 *                 example: "9876543210"
 *                 description: 10-digit Indian phone number
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 *       422:
 *         description: Input validation error
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/users/login-user:
 *   post:
 *     summary: Login user to the application
 *     tags: [User]
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */


const userValidationRulesSignUp = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Full name must be 3 to 50 characters long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Must be a valid phone number')
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),
];

const userValidationRulesLogin = [
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Must be a valid user'),

  body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({min:8}).withMessage('Password must be at least 8 characters long')
];

router.post('/create-user', userValidationRulesSignUp, userSignUp);
router.post('/login-user', userValidationRulesLogin, userLogin);

export default router;