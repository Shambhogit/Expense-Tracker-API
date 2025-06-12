import express from 'express';
import {userLogin, userSignUp} from '../controller/users.controller.js';
import { body } from 'express-validator';
const router = express.Router();

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
router.get('/login-user', userValidationRulesLogin, userLogin);

export default router;