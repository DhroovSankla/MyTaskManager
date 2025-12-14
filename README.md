# 📝 Full Stack Task Manager

A robust, full-stack implementation of a Task Management application built to demonstrate **CRUD operations** using a modern **Kotlin/Spring Boot** backend and a reactive **React** frontend.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-Full%20Stack-blue)

## 🚀 Tech Stack

**Backend:**
* **Language:** Kotlin 1.9
* **Framework:** Spring Boot 3.3
* **Database:** MySQL 8.0
* **ORM:** Hibernate / Spring Data JPA
* **Build Tool:** Gradle

**Frontend:**
* **Library:** React.js (Vite)
* **Styling:** Modern CSS3 with CSS Variables
* **HTTP Client:** Axios

## ✨ Features

* ✅ **Create Tasks:** Add new items to your persistent Todo list.
* ✅ **Read Tasks:** Fetch live data from the MySQL database on load.
* ✅ **Update Status:** Toggle tasks between "Pending" and "Completed" (Updates DB instantly).
* ✅ **Delete Tasks:** Remove items permanently from the database.
* ✅ **Cross-Origin Resource Sharing (CORS):** Fully configured to allow secure Frontend-Backend communication.

## 🛠️ Setup & Installation

### Prerequisites
* Java JDK 17+
* Node.js & npm
* MySQL Server

### 1. Database Setup
Create a MySQL database named `task_db` (or update `application.properties` with your credentials).
The application is configured to automatically generate the `my_todo_list` table on the first run.

### 2. Backend (Spring Boot)
```bash
cd TaskBackend
./gradlew bootRun
```
The server will start on http://localhost:8080

### 3. Frontend (React)
```bash
cd client
npm install
npm run dev
```
