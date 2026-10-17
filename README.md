# DIS_assignments
Assignments to subject Data intensive science in LUT 2026

## Airlines Management System - Assignment 2

This project is a web application developed for Assignment 2. It provides a frontend to manage airline data across three separate databases. Users can seamlessly read, add, update, and delete records (CRUD operations) for Employees, Planes, and Flight Lines.

### Features

*   **Three Separate Databases:** Uses three independent SQLite `.db` files (`employees.db`, `planes.db`, `lines.db`).
*   **Dummy Data:** Automatically seeds the databases with initial dummy data upon the first startup.
*   **Full CRUD:** Create, Read, Update, and Delete operations for all three entities.
*   **UI:** A responsive React frontend styled with Bootstrap.

### Technologies Used

*   **Frontend:** React (TypeScript, Vite), Bootstrap for styling.
*   **Backend:** Python, FastAPI.
*   **Database:** SQLite3.

---

### How to Run the Project locally

To run this project, you will need to open two separate terminal windows: one for the backend and one for the frontend.

#### 1. Start the Backend (FastAPI)

1. Install the required dependencies:
   ```bash
   pip install "fastapi[standard]"
   ```
4. Start the server:
   ```bash
   fastapi dev main.py
   ```

The backend API will run on `http://127.0.0.1:8000` and the databases will initialize automatically.

#### 2. Start the Frontend (React)

1. Install the Node modules:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```