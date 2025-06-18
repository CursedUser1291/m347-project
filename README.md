# Raum Manager

A full-stack room reservation system built with React (frontend) and Spring Boot (backend).

## Features

- User authentication (login/signup)
- Room reservation and management
- Public/private key sharing for reservations
- Room availability checking
- Responsive UI with Material Joy UI

---

## Project Structure

- `backend/` - Spring Boot REST API (Java)
- `frontend/` - React app (TypeScript)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Java 17+
- Maven

---

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Change the database configuration
    Change the database login configuration in `src/main/resources/application.properties` to match your MySQL Setup and User.

3. Build and run the Spring Boot app:
    ```sh
    ./mvnw spring-boot:run
    ```
   The backend will start on [http://localhost:8080](http://localhost:8080).

---

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the React app:
    ```sh
    npm run dev
    ```
   The frontend will start on [http://localhost:5173](http://localhost:5173) (or similar).

---

## Usage

- Visit the frontend URL in your browser.
- Sign up or log in.
- Reserve rooms, view/edit/delete your reservations.
- Use public/private keys to share or access reservations.

---

## Development

- Backend: Java, Spring Boot, JPA, MySQL (in-memory DB)
- Frontend: React, TypeScript, Material Joy UI
