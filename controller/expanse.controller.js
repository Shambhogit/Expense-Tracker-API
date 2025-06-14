import { validationResult } from 'express-validator';
import Expense from '../models/expense.model.js';
import User from '../models/user.model.js'
async function addExpense(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, error: errors.array()});
    }

    try {
        const email = req.user.email;
        const { userId, expenseName, type, amount, category, paymentMethod, note, transactionDate } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized User' });
        }

        if (!user._id.equals(userId)) {
            return res.status(401).json({ success: false, message: 'Unauthorized User' });
        }

        const parsedAmount = parseFloat(amount);
        if(isNaN(parsedAmount)){
            return res.status(400).json({success:false, message:'Amount Must be a valid number'});
        }

        const expense = {
            userId,
            expenseName,
            type,
            amount:parsedAmount,
            category,
            paymentMethod,
            note,
            transactionDate
        }

        await Expense.create(expense);
        return res.status(200).json({ success: true, message: 'Expense Added to DB' });

    } catch (error) {
        //log error for developer used in development
        console.log(`Error in addExpense ${error}`);

        //error for user used in production
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export {
    addExpense,
}