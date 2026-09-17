# AI_LOGS.md

# AI Development Logs

## Project Name

Pharmacy Management System

---

## 1. Project Overview

The Pharmacy Management System is a full-stack web application designed to help a neighborhood pharmacy manage medicine batches and inventory.

The system handles:

- Medicine batch management
- Batch expiry dates
- Medicine quantity
- Medicine price
- Medicine search
- Pagination
- Sorting
- User registration and login
- FEFO (First Expire, First Out) dispensing
- Prevention of expired stock dispensing
- Sellable stock calculation
- Expiry alerts

The application is being developed using the MERN stack.

---

# 2. AI Usage

AI was used as a development assistant throughout the project.

AI assistance was used for:

- Understanding the problem statement
- Breaking the project into smaller tasks
- Planning the backend architecture
- Designing database schemas
- Designing REST APIs
- Writing initial implementation code
- Debugging backend issues
- Testing APIs
- Setting up the React frontend
- Writing project documentation
- Creating AI development logs

The generated code was reviewed and tested manually before being included in the project.

---

# 3. Technology Selection

## Selected Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose
- JWT
- bcryptjs
- Vite

## Reason for Choosing MERN

AI was used to compare the project requirements with the available technology options.

MERN was selected because:

1. It allows fast full-stack development.
2. JavaScript can be used across the frontend and backend.
3. MongoDB is suitable for storing medicine batch records.
4. Express provides a simple REST API structure.
5. React is suitable for creating an interactive inventory dashboard.

The final technology choice was made based on the project requirements and developer familiarity with MERN.

---

# 4. Project Architecture

The project was divided into frontend and backend.

```text
pharmacy-management/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── REASONING.md
└── AI_LOGS.md