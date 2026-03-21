# 🧠 StudySharp (https://studysharp.in)

## Full-Stack MERN Platform for Academic & Administrative Automation

<p align="center"> <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge"/> <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/> <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge"/> <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge"/> <img src="https://img.shields.io/badge/Build-Vite-purple?style=for-the-badge"/> </p>

## 🚀 Project Overview

A comprehensive college management system built as a full-stack web application to streamline student and administrative workflows.

### 🎯 Key Capabilities:
```bash
📚 Notes sharing & Previous Year Questions (PYQs)
👨‍🏫 Faculty Directory.
🧭 Career guidance & roadmap generation
🔍 Lost & Found system
🧑‍💼 Admin dashboards for management
🔐 Secure authentication system
```
## 🏗️ System Architecture

<img width="1441" height="724" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/0aeb1e77-0866-4adf-8b1c-e0c09c710bb1" />

## 🧩 Project Structure

```bash
ROOT/
│
├── FRONTEND/
│   └── Student-facing React app
│
├── BACKEND/
│   └── Node.js API server
│
├── ADMIN_PANEL/
│   └── Admin dashboard
│
├── ADMINPANAL/
│   └── Secondary admin interface
│
└── debug-api.js
    └── API testing script
```
## 💻 Frontend Architecture
```bash
⚙️ Tech Stack
React 18 + Vite
React Router DOM
Tailwind CSS + Bootstrap
Axios
Framer Motion
React Hot Toast
````

## 🔄 Application Flow

<img width="2566" height="130" alt="mermaid-diagram (1)" src="https://github.com/user-attachments/assets/33337b50-5a26-4c6a-9c02-fd5e5c068177" />


## 🧠 State Management
```
1. AuthContext
  Handles login, logout, token refresh
  Stores:
        user
        isAuthenticated
        loading

2. DataContext
    Manages:
        Notes
        PYQs
        Subjects

3. AppContext
    Global app-level state

````

## 🛣️ Routing System

````bash
/api
 ├── /auth → Authentication Module
 ├── /users → User Management
 ├── /notes → Study Material Upload
 ├── /pyq → Previous Year Questions
 ├── /events → Event Management
 ├── /items → Lost & Found System
 ├── /faculty → Faculty Directory
 └── /career → Career Pathways & Guidance


/api
│
├── 🔐 /auth
│   ├── POST   /register           → Register new user (student/faculty)
│   ├── POST   /login              → Login user
│   ├── GET    /profile            → Get logged-in user profile
│   ├── PUT    /update-profile     → Update user information
│   └── POST   /logout             → Logout user
│
├── 👤 /users
│   ├── GET    /                   → Get all users (admin only)
│   ├── GET    /:id                → Get specific user by ID
│   ├── PUT    /:id                → Update user (e.g., role change)
│   └── DELETE /:id                → Delete user (admin only)
│
├── 📚 /notes
│   ├── POST   /upload             → Upload study material (faculty)
│   ├── GET    /                   → Get all notes
│   ├── GET    /:subject           → Get notes by subject
│   ├── GET    /:id                → Get single note
│   └── DELETE /:id                → Delete uploaded note
│
├── ❓ /pyq
│   ├── POST   /upload             → Upload previous year question paper
│   ├── GET    /                   → Get all question papers
│   ├── GET    /:subject           → Get questions by subject
│   └── DELETE /:id                → Delete question paper
│
├── 📅 /events
│   ├── POST   /create             → Create new event (admin)
│   ├── GET    /                   → Get all events
│   ├── GET    /:id                → Get single event
│   ├── PUT    /:id                → Update event details
│   ├── DELETE /:id                → Delete event
│   └── POST   /:id/register       → RSVP/Register for event
│
├── 🧾 /items   (Lost & Found)
│   ├── POST   /report             → Report a lost item
│   ├── GET    /                   → Get all lost/found items
│   ├── GET    /:id                → Get details of one item
│   ├── PUT    /:id/status         → Update item status (found/unclaimed)
│   └── DELETE /:id                → Remove item report
│
├── 👩‍🏫 /faculty
│   ├── POST   /add                → Add new faculty (admin)
│   ├── GET    /                   → Get all faculty members
│   ├── GET    /:id                → Get faculty by ID
│   ├── PUT    /:id                → Update faculty info
│   └── DELETE /:id                → Delete faculty record
│
└── 🧭 /career
    ├── POST   /add                → Add new career pathway (admin)
    ├── GET    /                   → Get all career pathways
    ├── GET    /:id                → Get single career pathway
    ├── PUT    /:id                → Update career pathway
    └── DELETE /:id                → Delete career pathway
````

## 🔐 Authentication Flow

<img width="1428" height="862" alt="mermaid-diagram (2)" src="https://github.com/user-attachments/assets/6e33f45e-31d5-4bba-9145-0f17175aa39c" />

## 🔑 Features:
```
JWT stored in HTTP-only cookies
Auto token refresh
Role-based access control
Secure session handling
````
## 🔄 Backend Flow

<img width="507" height="918" alt="mermaid-diagram (3)" src="https://github.com/user-attachments/assets/7d84b5be-675c-409d-a725-1274a2b0bb51" />

## 📊 Data Flow Example

<img width="1700" height="862" alt="mermaid-diagram (4)" src="https://github.com/user-attachments/assets/4b98cb35-154d-49e8-8eec-a920d271dc57" />

## 🖼️ File Upload Pipeline

<img width="1579" height="130" alt="mermaid-diagram (5)" src="https://github.com/user-attachments/assets/feca67aa-3281-4d09-872c-defd96729a18" />

## 🛡️ Security Features
````
🔐 JWT Authentication (HTTP-only cookies)
🛑 Rate limiting
🧱 Helmet security headers
✅ Joi validation (anti NoSQL injection)
🌐 CORS protection
````

The backend serves as the core API provider for the application.
- **Entry Point**: `index.js` initializes the server and connects to the database.
- **App Configuration**: `app.js` sets up middleware and mounts the main API router.
- **Routing**: `routes/index.js` acts as the central hub, aggregating specific routes for different features:
    - **Auth**: User authentication and authorization.
    - **User**: User management.
    - **Notes**: Academic notes management.
    - **PYQ**: Previous Year Questions management.
    - **Events**: College event management.
    - **Faculty**: Faculty directory and details.
    - **Career**: Career guidance and opportunities.
    - **Lost & Found**: Managing lost and found items.
- **Database**: MongoDB is used as the primary data store, with models defined in `models/`.
- **Controllers**: Logic for handling requests is encapsulated in `controllers/`.

## Frontend (`FRONTEND/`)
The frontend is a React application organized by modules.
- **Modules**: The `src/MODULES` directory contains feature-specific components and logic:
    - **Home**: Landing page and general information.
    - **Profile**: User profile management.
    - **NotesPage**: Interface for browsing and downloading notes.
    - **Primum_Page3(PYQ)**: Interface for accessing previous year questions.
    - **AdminPanel**: Administrative tools for managing users and content.
- **Services**: API calls are managed in `src/services`, ensuring a clean separation between UI and data fetching.
- **Context**: Global state management is handled in `src/context`.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a cloud MongoDB URI)

### Setup
1.  **Clone the repository**
    ```bash
    git clone https://github.com/Omprakash23081/Collage_Mini_Project.git
    ```

2.  **Backend Setup**
    ```bash
    cd BACKENDS
    npm install
    # Create a .env file with PORT and MONGODB_URI
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd FRONTEND
    npm install
    npm run dev
    ```
