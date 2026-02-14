# BookHaven - Modern Library Management System

BookHaven is a comprehensive, full-stack web application designed to modernize the library experience. It features a robust Spring Boot backend and a dynamic, interactive React frontend, providing a seamless experience for both users and administrators.

## 🚀 Features

### For Users
*   **Browse Collection**: Explore a vast catalog of books with a modern, responsive grid layout.
*   **Smart Search**: Instantly find books by title using the powerful search bar.
*   **Shopping Cart**: Add books to your cart, adjust quantities, and manage your selection.
*   **Secure Checkout**: A multi-step checkout process with address collection and mock payment integration.
*   **Order Tracking**: View order history and track the status of your requests (Pending, Approved, Delivered).
*   **User Profile**: Manage personal details (Name, Email, Address) with an easy-to-use edit interface.
*   **Contact Support**: A floating contact button for quick access to library support.

### For Administrators
*   **Admin Dashboard**: A centralized hub to view and manage all orders.
*   **Order Management**: Approve, Deliver, or Cancel user orders with a single click.
*   **Inventory Management**: Add new books, update details, and remove outdated items.
*   **User Messages**: View inquiries sent by users through the contact form.
*   **Role-Based Access**: Strict security ensuring only admins can access sensitive features.

## 🛠️ Tech Stack

### Frontend
*   **React 18**: Component-based UI library for building interactive user interfaces.
*   **Bootstrap 5**: Responsive styling framework for a clean, professional look.
*   **Framer Motion**: Production-ready animation library for smooth transitions and effects.
*   **Axios**: Promise-based HTTP client for API communication.
*   **React Router**: Client-side routing for a single-page application experience.
*   **React Icons**: Comprehensive icon library.

### Backend
*   **Java 21**: Core programming language.
*   **Spring Boot 3.5**: Application framework for rapid development.
*   **Spring Security**: Robust authentication and authorization (RBAC).
*   **Spring Data MongoDB**: NoSQL database integration for flexible data storage.
*   **Maven**: Dependency management and build tool.

## 📦 Getting Started

### Prerequisites
*   **Java JDK 21+**
*   **Node.js & npm**
*   **MongoDB** (running locally on default port 27017)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd BookApplication
    ```

2.  **Backend Setup**
    Navigate to the root directory and run:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.

3.  **Frontend Setup**
    Open a new terminal, navigate to the frontend folder, and run:
    ```bash
    cd frontend
    npm install
    npm start
    ```
    The application will open automatically at `http://localhost:3000`.

## 🔑 Usage Guide

1.  **Register**: Create a new account. (Tip: Include "admin" in your username to auto-register as an Administrator for testing).
2.  **Login**: Access your personalized dashboard.
3.  **Explore**: Browse books, add them to your cart, and proceed to checkout.
4.  **Manage**: If logged in as Admin, use the Dashboard to approve orders and manage inventory.

## 📂 Project Structure

*   `src/main/java`: Spring Boot Backend
    *   `controller`: REST Controllers (`BookRestController`, `OrderRestController`, `AuthRestController`, `CartRestController`)
    *   `domain`: Data Models (`Book`, `User`, `Order`, `Cart`)
    *   `repo`: MongoDB Repositories
    *   `config`: Security Configuration
*   `frontend`: React Frontend
    *   `src/components`: UI Components (`Home`, `BookList`, `Cart`, `Checkout`, `AdminDashboard`)
    *   `src/context`: State Management (`AuthContext`, `CartContext`)
    *   `public`: Static Assets

## 📄 License

This project is licensed under the MIT License.
