//env configuration
import env from 'dotenv';
env.config();


import express, { json, urlencoded } from 'express';
import cors from 'cors';
import userRouter from './routes/users.routes.js';
import expenseRouter from './routes/expense.routes.js';
import connectToDatabase from './database/connectToDatabase.js';

import { swaggerUi, swaggerSpec } from './config/swagger.js';


//basic express app setup
const app = express();

//assigning port to backend
const PORT = process.env.PORT || 3001;

//db connection function
connectToDatabase();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//docs
const customOptions = {
    customCss: `
    .swagger-ui .topbar { display: none } 
    .swagger-ui .info h1 { color: #1d4ed8; font-size: 28px; }
    .swagger-ui .scheme-container { background-color: #f3f4f6; }
  `,
    customSiteTitle: "Expense Tracker API Docs",
    customfavIcon: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, customOptions));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/expense', expenseRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`);
})