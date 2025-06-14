import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  expenseName: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
    min: 0,
  },

  type: {
    type: String,
    enum: ['expense', 'income'],
    default:'expense'
  },

  category: {
    type: String, 
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'bank transfer'],
    default: 'cash',
  },

  note: {
    type: String,
    default: '',
  },

  transactionDate: {
    type: Date,
    default: Date.now,
  },

}, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
