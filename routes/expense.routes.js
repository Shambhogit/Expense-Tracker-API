import express from 'express';
import { addExpense } from '../controller/expanse.controller.js';
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

router.post('/add-expense', isUserAuthenticated, inputValidation, addExpense);

export default router;