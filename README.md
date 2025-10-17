---

````markdown
# Trans Cosmos Test

This repository contains a fullstack test project built for **Trans Cosmos**.  
The project consists of a **Laravel backend API** and a **Next.js frontend** for task management, including authentication and file attachments.

---

## 🏗️ Tech Stack

### Backend

- Laravel 12
- MySQL
- JWT Authentication
- RESTful API Architecture

### Frontend

- Next.js 15.4.3
- TypeScript
- Tailwind CSS
- Axios for API requests

---

## ⚙️ Setup Guide

Please refer to the detailed setup instructions for both backend and frontend in the following file:

📄 [setup-guide.md](./setup-guide.md)

---

## 📁 Project Structure

```bash
trans-cosmos-test/
├── backend/          # Laravel API for authentication, tasks, and attachments
├── frontend/         # Next.js frontend for task management UI
├── setup-guide.md    # Environment and installation instructions
└── README.md         # Project overview
```

---

## 🚀 Features

- User authentication with JWT (login, register)
- CRUD operations for tasks
- File upload for task attachments
- REST API integration between frontend and backend
- Responsive UI with clean and modern design

---

## 🧑‍💻 Development

### Backend

```bash
cd backend
php artisan serve
```

### Frontend

```bash
cd frontend
npm run dev
```

Then open the app in your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🪪 Environment Variables

### Backend (`.env`)

Make sure to set your JWT secret key:

```env
JWT_SECRET=your_jwt_secret
```

### Frontend (`.env.local`)

Set your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---
