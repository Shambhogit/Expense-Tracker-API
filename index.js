import express, { json, urlencoded } from 'express';
import cors from 'cors';
import userRouter from './routes/users.routes.js';
import expenseRouter from './routes/expense.routes.js';
import connectToDatabase from './database/connectToDatabase.js';
import env from 'dotenv';

//env configuration
env.config();

//basic express app setup
const app = express();

//assigning port to backend
const PORT = process.env.PORT || 3001;

//db connection function
connectToDatabase();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/expense', expenseRouter);


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT} port`);
})