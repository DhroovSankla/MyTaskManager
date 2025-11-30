# 🚀 Enterprise Task Manager

A Full Stack Task Management application built to demonstrate **CRUD operations**, **REST API architecture**, and **State Management**.

## 🛠️ Tech Stack
* **Backend:** Java 17, Spring Boot 3, Spring Data JPA
* **Frontend:** React.js (Vite), JavaScript (ES6)
* **Database:** MySQL (Relational DB)
* **Tools:** Postman (API Testing), Git/GitHub

## ✨ Features
* **Create Tasks:** Add new tasks via the React UI, saved instantly to MySQL.
* **Read Tasks:** Fetches data from the backend API on load.
* **Update Status:** Click tasks to toggle between "Pending" ⬜ and "Done" ✅.
* **Delete Tasks:** Remove completed tasks permanently from the database.
* **Persistent Data:** Data survives page refreshes and server restarts.

## 🏗️ Architecture
**Client (React)** ↔️ **HTTP JSON** ↔️ **Server (Spring Boot)** ↔️ **JPA/Hibernate** ↔️ **Database (MySQL)**

## 🚀 How to Run Locally

### 1. Backend Setup
1.  Clone the repo.
2.  Open `TaskBackend` in IntelliJ IDEA.
3.  Configure MySQL settings in `src/main/resources/application.properties`.
4.  Run `TaskBackendApplication.java`.

### 2. Frontend Setup
1.  Open `client` folder in VS Code.
2.  Run `npm install` to get dependencies.
3.  Run `npm run dev` to start the server.
4.  Open `http://localhost:5173`.

---
*Built as part of the Full Stack Java Developer Path.*
