
# Expense Tracker API

## 📦 Dependencies

All dependencies are listed in [`package.json`](package.json):

- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling.
- **dotenv**: Loads environment variables from `.env`.
- **cors**: Enables Cross-Origin Resource Sharing.
- **express-validator**: Middleware for validating and sanitizing user input.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **swagger-jsdoc** & **swagger-ui-express**: For API documentation.
- **cookie-parser**: (optional, for cookies if needed)

**Install all dependencies:**
```bash
npm install
```

---

## 🗂️ Project Structure

```
Expense Tracker API/
│
├── config/
│   └── swagger.js
├── controller/
│   ├── expanse.controller.js
│   └── users.controller.js
├── database/
│   └── connectToDatabase.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── expense.model.js
│   └── user.model.js
├── routes/
│   ├── expense.routes.js
│   └── users.routes.js
├── .env
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Environment Configuration

All sensitive data and configuration are stored in a `.env` file:

```
PORT=3001
DB_URL=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret
```

- `PORT`: Port for the server.
- `DB_URL`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT token signing.

---

## 🚀 Application Entry Point: [`index.js`](index.js)

- Loads environment variables.
- Sets up Express app, CORS, JSON parsing.
- Connects to MongoDB using [`connectToDatabase.js`](database/connectToDatabase.js).
- Registers user and expense routes.
- Serves Swagger API docs at `/api-docs`.
- Starts the server.

**Example:**
```js
import env from 'dotenv';
env.config();

import express from 'express';
import cors from 'cors';
import userRouter from './routes/users.routes.js';
import expenseRouter from './routes/expense.routes.js';
import connectToDatabase from './database/connectToDatabase.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 3001;

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/expense', expenseRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`);
});
```

---

## 🛢️ Database Connection: [`database/connectToDatabase.js`](database/connectToDatabase.js)

Connects to MongoDB using Mongoose and logs the connection status.

```js
import mongoose from "mongoose";

export default function connectToDatabase() {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Connected To DB'))
        .catch((err) => console.log('Error in DB Connection : ', err));
}
```

---

## 👤 User Model: [`models/user.model.js`](models/user.model.js)

Defines the schema for users:

| Field     | Type   | Required | Unique | Description         |
|-----------|--------|----------|--------|---------------------|
| fullName  | String | Yes      | No     | User's full name    |
| email     | String | Yes      | Yes    | User's email        |
| password  | String | Yes      | No     | Hashed password     |
| phone     | String | Yes      | No     | User's phone number |

Timestamps are automatically added.

---

## 💸 Expense Model: [`models/expense.model.js`](models/expense.model.js)

Defines the schema for expenses:

| Field           | Type     | Required | Description                        |
|-----------------|----------|----------|------------------------------------|
| userId          | ObjectId | Yes      | Reference to User                  |
| expenseName     | String   | Yes      | Name of the expense/income         |
| amount          | Number   | Yes      | Amount (must be >= 0)              |
| type            | String   | Yes      | 'expense' or 'income'              |
| category        | String   | Yes      | Category of the expense/income     |
| paymentMethod   | String   | No       | 'cash', 'card', 'upi', 'bank transfer' |
| note            | String   | No       | Optional note                      |
| transactionDate | Date     | No       | Date of transaction (default: now) |

---

## 🔒 Authentication Middleware: [`middleware/auth.middleware.js`](middleware/auth.middleware.js)

Checks for a valid JWT token in the `Authorization` header. If valid, attaches user info to `req.user`.

```js
import jwt from 'jsonwebtoken';

async function isUserAuthenticated(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader?.split(' ')[0] !== 'Bearer') {
            return res.status(401).json({ success: false, message: 'Unauthorized access' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or Expired token' });
    }
}
export { isUserAuthenticated };
```

---

## 🧑‍💻 User Routes & Controller

### [`routes/users.routes.js`](routes/users.routes.js)

- **POST `/api/v1/users/create-user`**: Register a new user.
- **POST `/api/v1/users/login-user`**: Login and receive a JWT.

Validation is handled using `express-validator`.

### [`controller/users.controller.js`](controller/users.controller.js)

#### **Register User**

- Validates input.
- Checks if user exists.
- Hashes password.
- Stores user in DB.

**Example Request:**
```json
POST /api/v1/users/create-user
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Responses:**
- `201 Created`:  
  `{ "success": true, "message": "New user created Successfully" }`
- `409 Conflict`:  
  `{ "success": false, "message": "User already Exists" }`
- `422 Unprocessable Entity`:  
  `{ "success": false, "error": [ ...validation errors... ] }`
- `500 Internal Server Error`:  
  `{ "success": false, "message": "Internal Server Error" }`

#### **Login User**

- Validates input.
- Checks credentials.
- Returns JWT token.

**Example Request:**
```json
POST /api/v1/users/login-user
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Responses:**
- `200 OK`:  
  `{ "success": true, "message": "Login Successful", "token": "<jwt_token>" }`
- `400 Bad Request`:  
  `{ "success": false, "message": "Invalid Credentials" }`
- `422 Unprocessable Entity`:  
  `{ "success": false, "error": [ ...validation errors... ] }`
- `500 Internal Server Error`:  
  `{ "success": false, "error": "Internal Server Error" }`

---

## 💰 Expense Routes & Controller

### [`routes/expense.routes.js`](routes/expense.routes.js)

- **POST `/api/v1/expense/add-expense`**: Add a new expense/income (JWT required).
- **GET `/api/v1/expense/get-expenses`**: Get all expenses for the user, with filters (JWT required).
- **DELETE `/api/v1/expense/delete-expense/:id`**: Delete an expense by ID (JWT required).
- **PUT `/api/v1/expense/update-expense/:id`**: Update an expense by ID (JWT required).

### [`controller/expanse.controller.js`](controller/expanse.controller.js)

#### **Add Expense**

**Example Request:**
```json
POST /api/v1/expense/add-expense
Authorization: Bearer <jwt_token>
{
  "userId": "<user_id>",
  "expenseName": "Lunch",
  "type": "expense",
  "amount": 200,
  "category": "Food",
  "paymentMethod": "cash",
  "note": "Lunch with friends"
}
```

**Responses:**
- `200 OK`:  
  `{ "success": true, "message": "Expense Added to DB" }`
- `401 Unauthorized`:  
  `{ "success": false, "message": "Unauthorized User" }`
- `422 Unprocessable Entity`:  
  `{ "success": false, "error": [ ...validation errors... ] }`
- `500 Internal Server Error`:  
  `{ "success": false, "message": "Internal Server Error" }`

#### **Get Expenses**

Supports filters: `category`, `from`, `to`, `weeks`, `page`, `limit`.

**Example Request:**
```
GET /api/v1/expense/get-expenses?category=Food&weeks=2&page=1&limit=10
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "totalPages": 1,
  "totalResults": 2,
  "expenses": [
    {
      "_id": "...",
      "userId": "...",
      "expenseName": "Lunch",
      "amount": 200,
      "type": "expense",
      "category": "Food",
      "paymentMethod": "cash",
      "note": "Lunch with friends",
      "transactionDate": "2025-06-14T12:00:00.000Z",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### **Delete Expense**

**Example Request:**
```
DELETE /api/v1/expense/delete-expense/<expense_id>
Authorization: Bearer <jwt_token>
```

**Responses:**
- `200 OK`:  
  `{ "success": true, "message": "Expense Deleted Successfully" }`
- `404 Not Found`:  
  `{ "success": false, "message": "Expense not found or unauthorized" }`
- `401 Unauthorized`:  
  `{ "success": false, "message": "Unauthorized Access" }`

#### **Update Expense**

**Example Request:**
```json
PUT /api/v1/expense/update-expense/<expense_id>
Authorization: Bearer <jwt_token>
{
  "expenseName": "Dinner",
  "amount": 300,
  "category": "Food"
}
```

**Responses:**
- `200 OK`:  
  `{ "success": true, "message": "Expense updated successfully" }`
- `404 Not Found`:  
  `{ "success": false, "message": "Expense not found or unauthorized" }`
- `400 Bad Request`:  
  `{ "success": false, "message": "Invalid Expense ID" }`
- `401 Unauthorized`:  
  `{ "success": false, "message": "Unauthorized User" }`

---

## 📑 API Documentation

Interactive Swagger docs are available at:  
[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 📝 Notes

- All endpoints expect and return JSON.
- Use the JWT token from login for all protected routes (in the `Authorization` header as `Bearer <token>`).
- Error responses are consistent for easy frontend handling.

---

## 📚 Related Docs

- [express-validator Cheat Sheet](./ExpressValidator.md)
- [HTTP Status Codes Reference](./StatusCode.md)

---

## 🏁 Quick Start

1. Clone the repo and install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file as shown above.
3. Start MongoDB locally or use a cloud DB.
4. Start the server:
    ```bash
    npm start
    ```
5. Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for API documentation.

---