# JobGenie – Smart Job Portal System 🚀

JobGenie is a modern, production-ready full-stack job portal designed for both employers and job seekers. It features a stunning glassmorphic UI, role-based authentication, and a clean RESTful API.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Framer Motion, Lucide Icons
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt password hashing

## 👤 User Roles

### Employer
- Register/Login
- Post, Edit, and Delete job listings
- View applicants for each job
- Track and update application status (Pending, Shortlisted, Rejected)

### Employee (Job Seeker)
- Register/Login
- Browse and search jobs with filters (Title, Location, Salary)
- Apply for jobs with a single click
- Track application status in a personalized dashboard

## 📂 Project Structure

```text
/job-portal
  /client          # Vite + React Frontend
  /server          # Node.js + Express Backend
  schema.sql       # MySQL Database Schema
  README.md        # Documentation
```

## 🚀 Setup Instructions

### 1. Database Setup
1. Open your MySQL client (XAMPP, MySQL Workbench, etc.).
2. Execute the queries in `schema.sql` to create the database and tables.

### 2. Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Configure the `.env` file with your database credentials.
4. Start the server: `npm start` (or `node index.js`)

### 3. Frontend Setup
1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## 🔐 Security Features

- **JWT-based Authentication:** Secure access to protected routes.
- **Password Hashing:** Passwords are never stored in plain text.
- **SQL Injection Prevention:** Uses prepared statements for all database queries.
- **Role-Based Access Control:** Restricted middleware to distinguish between Employer and Employee.

## 🎨 UI/UX Highlights

- **Glassmorphism Design:** Modern, translucent cards with blur effects.
- **Responsive Layout:** Works seamlessly on mobile and desktop.
- **Interactive Dashboards:** Separate experiences tailored for different user roles.
- **Animated Interactions:** Smooth transitions using Framer Motion.

---

Built with ❤️ for a modern hiring experience.
