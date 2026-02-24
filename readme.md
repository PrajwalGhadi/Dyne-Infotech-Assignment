# Full-Stack Assignment - Dyne Infotech

A fully functional full-stack application featuring a React-based frontend, a Node.js/Express backend, and a PostgreSQL database. This project demonstrates the complete development lifecycle, from local environment setup to cloud deployment via netlify and render platform.

## 🚀 Live Demo
- **Frontend:** https://prajwal-ghadigaonkar-assignment.netlify.app/
- **Backend API:** https://dyne-project-backend.onrender.com

---

## 🛠️ Tech Stack

- **Frontend:** React.js / Vite (Deployed on **Netlify**)
- **Backend:** Node.js & Express.js (Deployed on **Render**)
- **Database:** PostgreSQL (Hosted on **Render**)
- **State Management & Routing:** React Router + Basic UseState (No State Management Done)

---

## ✨ Key Features

- **End-to-End Connectivity:** Seamless data flow from a cloud-hosted PostgreSQL DB to a React frontend.
- **Secure Authentication/Data Handling:** (Mention if you used JWT or specific forms).
- **Relational Database:** Structured data management using PostgreSQL.
- **Production Ready:** Configured with CORS, SSL for database security, and environment variables.

---

## 🔒 Security Implementations

### CORS Policy
The Backend API is protected by a strict CORS policy. It is configured to only allow cross-origin requests from the official Netlify deployment and local development environments. This prevents unauthorized websites from making requests to the API on behalf of users.

### Database Security
- **SSL/TLS:** Connections to the PostgreSQL database are encrypted using SSL, as required by Render.
- **Environment Variables:** All sensitive credentials (DB URLs, Passwords) are managed via `.env` files and Render's secret management, ensuring they are never exposed in the source code.

---

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone [https://github.com/PrajwalGhadi/Dyne-Infotech-Assignment.git](https://github.com/PrajwalGhadi/Dyne-Infotech-Assignment.git)

cd Dyne-Infotech-Assignment