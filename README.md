# Collage Mini Project

## Project Overview
This project is a comprehensive college management system designed to facilitate various academic and administrative tasks. It features a robust backend built with Node.js and Express, coupled with a dynamic React frontend.

## Project Flow

### Backend (`BACKENDS/`)
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

### Frontend (`FRONTEND/`)
The frontend is a React application organized by modules.
- **Modules**: The `src/MODULES` directory contains feature-specific components and logic:
    - **Home**: Landing page and general information.
    - **Profile**: User profile management.
    - **NotesPage**: Interface for browsing and downloading notes.
    - **Primum_Page3(PYQ)**: Interface for accessing previous year questions.
    - **AdminPanel**: Administrative tools for managing users and content.
- **Services**: API calls are managed in `src/services`, ensuring a clean separation between UI and data fetching.
- **Context**: Global state management is handled in `src/context`.

## Installation & Running

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a cloud MongoDB URI)

### Setup
1.  **Clone the repository**
    ```bash
    git clone <repository-url>
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
