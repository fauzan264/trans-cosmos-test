# 🧩 Trans Cosmos Test — Setup Guide

This guide explains how to set up and run the **Trans Cosmos Test** project locally (Laravel backend + Next.js frontend).

## 📁 Project Structure

```

trans-cosmos-test/
├── backend/ # Laravel API
├── frontend/ # Next.js Frontend
└── README.md

```

---

## ⚙️ Requirements

Before starting, make sure you have the following installed:

- **PHP** ≥ 8.1
- **Composer**
- **Node.js** ≥ 18
- **npm** or **yarn**
- **MySQL** / **MariaDB**

---

## 🚀 Backend Setup (Laravel)

1. **Go to the backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   composer install
   ```

3. **Copy the environment file**

   ```bash
   cp .env.example .env
   ```

4. **Update the `.env` file**
   Make sure the following values are set:

   ```env
   APP_NAME=TransCosmosTest
   APP_ENV=local
   APP_KEY=
   APP_DEBUG=true
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=trans_cosmos_test
   DB_USERNAME=root
   DB_PASSWORD=

   JWT_SECRET=
   ```

5. **Generate the app key and JWT secret**

   ```bash
   php artisan key:generate
   php artisan jwt:secret
   ```

6. **Run database migrations**

   ```bash
   php artisan migrate
   ```

7. **Start the local server**

   ```bash
   php artisan serve
   ```

   The backend will run at `http://localhost:8000`.

---

## 💻 Frontend Setup (Next.js)

1. **Go to the frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create an `.env` file**
   Add the following line:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```

   > Make sure this URL matches your backend API base URL.

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will run at `http://localhost:3000`.

---

## 📜 Command Summary

| Location    | Command                    | Description                   |
| ----------- | -------------------------- | ----------------------------- |
| `backend/`  | `composer install`         | Install Laravel dependencies  |
| `backend/`  | `php artisan key:generate` | Generate app key              |
| `backend/`  | `php artisan jwt:secret`   | Generate JWT secret           |
| `backend/`  | `php artisan migrate`      | Run database migrations       |
| `backend/`  | `php artisan serve`        | Start backend server          |
| `frontend/` | `npm install`              | Install frontend dependencies |
| `frontend/` | `npm run dev`              | Start frontend server         |

---

## ✅ Done!

Once everything is set up successfully, you can access the app at:

- Frontend → `http://localhost:3000`
- Backend API → `http://localhost:8000/api`
