# Pharmacy Management System

A full-stack pharmacy inventory management system designed to manage medicine batches, track expiry dates, calculate sellable stock, and dispense medicines using **FEFO (First Expiry, First Out)** logic.

## Problem Statement

In a pharmacy, the same medicine can have multiple batches with different expiry dates.

The system should:

* Store medicine batch information
* Track batch quantity and expiry date
* Prevent dispensing expired medicines
* Dispense the batch with the earliest valid expiry first
* Calculate total sellable stock
* Search medicines and view their available batches
* Provide expiry alerts
* Support user registration and login
* Persist all data in a real database

## Key Features

### 1. User Authentication

* User registration
* User login
* Password hashing using bcrypt
* JWT-based authentication

### 2. Batch Management

* Add medicine batches
* View medicine batches
* Update batch information
* Delete batches
* Store expiry date, quantity, batch number, and price

### 3. FEFO Dispensing

The system follows **FEFO (First Expiry, First Out)**.

When a medicine is dispensed:

1. Expired batches are ignored.
2. Valid batches are sorted by expiry date.
3. The batch with the earliest expiry is selected first.
4. If one batch does not have enough quantity, the system continues with the next earliest-expiring batch.
5. Expired stock is never dispensed.

### 4. Sellable Stock

Sellable stock is calculated using only batches whose expiry date has not passed.

```text
Sellable Stock = Sum of quantities of valid, non-expired batches
```

### 5. Search, Sorting and Pagination

The system will support:

* Medicine name search
* Batch search
* Expiry-date sorting
* Pagination for batch records

### 6. Expiry Alerts

The dashboard will identify medicines that are approaching their expiry date so that pharmacy staff can take action before the stock expires.

## Tech Stack

### Frontend

* React.js
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* bcryptjs
* JSON Web Token (JWT)

## Project Structure

```text
pharmacy-management/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Batch.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── batchRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│
├── README.md
├── REASONING.md
└── AI_LOGS.md
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Batch Management

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/batches`     | Add a new batch      |
| GET    | `/api/batches`     | Get batches          |
| GET    | `/api/batches/:id` | Get a specific batch |
| PUT    | `/api/batches/:id` | Update a batch       |
| DELETE | `/api/batches/:id` | Delete a batch       |

### Inventory Operations

| Method | Endpoint                             | Description                  |
| ------ | ------------------------------------ | ---------------------------- |
| GET    | `/api/medicines/:medicineName/stock` | Get sellable stock           |
| POST   | `/api/dispense`                      | Dispense medicine using FEFO |

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Never commit `.env` or database credentials to GitHub.**

## Running the Backend

From the `backend` directory:

```bash
npm install
node server.js
```

For development with nodemon:

```bash
npx nodemon server.js
```

The backend runs on:

```text
http://localhost:5000
```

## Example Batch

```json
{
  "medicineName": "Paracetamol",
  "batchNumber": "PAR001",
  "expiryDate": "2026-10-01",
  "quantity": 50,
  "price": 20
}
```

## FEFO Example

Suppose the pharmacy has:

```text
Paracetamol

Batch A → Expiry: 2026-10-01 → Quantity: 20
Batch B → Expiry: 2026-12-15 → Quantity: 50
Batch C → Expiry: 2027-02-10 → Quantity: 30
```

If the customer wants **25 units**, the system will:

```text
Batch A → 20 units
Batch B → 5 units
```

The expired or later-expiring stock is used only when necessary.

## Validation Rules

The system should ensure that:

* Medicine name is required
* Batch number is required
* Expiry date is required
* Quantity cannot be negative
* Price cannot be negative
* Expired batches cannot be dispensed
* Dispensing more stock than available is rejected
* Failed dispensing should not partially modify inventory

## Future Improvements

* Dashboard with inventory statistics
* Low-stock alerts
* Expiry notification system
* Role-based access
* Sales history
* Pharmacy analytics
* Responsive UI
* Deployment

## Project Goal

The goal is to provide a simple and reliable pharmacy inventory system that reduces manual stock management and ensures medicines are dispensed according to their expiry dates.

## Development Status

### Completed

* Project setup
* Backend setup
* MongoDB connection
* User model
* Authentication routes
* Batch model
* Batch routes setup

### In Progress

* Batch CRUD APIs
* FEFO dispensing logic
* Sellable stock calculation
* Search, sorting and pagination
* Expiry alerts
* React frontend
* Testing and deployment
