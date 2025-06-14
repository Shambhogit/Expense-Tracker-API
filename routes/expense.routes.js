import express from 'express';
import { addExpense, getExpenses } from '../controller/expanse.controller.js';
import { isUserAuthenticated } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
const router = express.Router();


const inputValidation = [
    body('expenseName')
    .notEmpty().withMessage('Expense Name is Required')
    .isLength({ min: 3, max: 30 }).withMessage('Expense Name should be in range of 3 to 30 characters'),
    
    body('category')
    .notEmpty().withMessage('Category is Required')
    .isLength({ min: 3, max: 30 }).withMessage('Category should be in range of 3 to 30 characters'),
    
    body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['income', 'expense']).withMessage('Type must be either "income" or "expense"'),
    
    body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number'),
]

/**
 * @swagger
 * /api/v1/expense/add-expense:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expense]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - expenseName
 *               - type
 *               - amount
 *               - category
 *             optional:
 *               - paymentMethod
 *               - note
 *               - transactionDate
 *             properties:
 *               userId:
 *                 type: string (mongoose.types.ObjectID)
 *               expenseName:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               note:
 *                 type: string
 *               transactionDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Expense added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/v1/expense/get-expenses:
 *   get:
 *     summary: Get all expenses with optional filters
 *     description: Returns a list of expenses for the authenticated user with optional filters (category, weeks, date range, and pagination).
 *     tags:
 *       - Expense
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (case-insensitive)
 *         example: Food
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter from date (YYYY-MM-DD)
 *         example: 2025-06-01
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter to date (YYYY-MM-DD)
 *         example: 2025-06-14
 *       - in: query
 *         name: weeks
 *         schema:
 *           type: integer
 *         description: Get expenses from past N weeks (1 to 12)
 *         example: 2
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully returned filtered expense data
 *       400:
 *         description: Invalid date or query parameter
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */


router.post('/add-expense', isUserAuthenticated, inputValidation, addExpense);
router.get('/get-expenses', isUserAuthenticated, getExpenses);
export default router;