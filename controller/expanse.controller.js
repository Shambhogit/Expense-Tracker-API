import { validationResult } from 'express-validator';
import Expense from '../models/expense.model.js';
import User from '../models/user.model.js';

async function addExpense(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, error: errors.array() });
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
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ success: false, message: 'Amount Must be a valid number' });
        }

        const expense = {
            userId,
            expenseName,
            type,
            amount: parsedAmount,
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

async function getExpenses(req, res) {
    try {
        const email = req.user.email;
        const query = req.query;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized Access' });
        }

        const userId = user._id;
        const filterArray = [{ userId }];

        if (query.category) {
            filterArray.push({
                category: { $regex: query.category, $options: 'i' }
            });
        }

        const weeks = parseInt(query.weeks);
        if (weeks && (weeks <= 0 || weeks > 12)) {
            return res.status(400).json({ success: false, message: 'Weeks must be between 1 and 12' });
        }

        if (!isNaN(weeks) && weeks > 0 && weeks <= 12) {
            const now = new Date();
            const pastDate = new Date();
            pastDate.setDate(now.getDate() - weeks * 7);

            filterArray.push({
                transactionDate: {
                    $gte: pastDate,
                    $lte: now
                }
            });
        }

        let { from: start, to: end } = query;

        if (start && isNaN(Date.parse(start))) {
            return res.status(400).json({ success: false, message: 'Invalid from date' });
        }

        if (end && isNaN(Date.parse(end))) {
            return res.status(400).json({ success: false, message: 'Invalid to date' });
        }

        if (start) {
            start = new Date(`${start}T00:00:00.000Z`);
            filterArray.push({ transactionDate: { $gte: start } });
        }

        if (end) {
            end = new Date(`${end}T23:59:59.999Z`);
            filterArray.push({ transactionDate: { $lte: end } });
        }

        const filter = { $and: filterArray };

        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const [expenses, total] = await Promise.all([
            Expense.find(filter).skip(skip).limit(limit),
            Expense.countDocuments(filter)
        ]);

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalResults: total,
            expenses
        });

    } catch (error) {
        console.error(`Error in getExpenses: ${error.message}`);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


export {
    addExpense,
    getExpenses,
}