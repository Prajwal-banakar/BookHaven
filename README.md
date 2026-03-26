# BookHaven - Modern Online Book Store

BookHaven is a comprehensive, full-stack e-commerce application designed for buying and selling books online. It features a robust Spring Boot backend and a dynamic, interactive React frontend, providing a seamless shopping experience for customers and powerful management tools for administrators.

## 🚀 Features

### For Customers
*   **Dynamic Home Page**: A modern dashboard with quick access to key features.
*   **Browse Store**: Explore a vast catalog of books with a modern, responsive grid layout.
*   **Advanced Search**: Find books by title, author, publication year range, and price range.
*   **Wishlist/Favorites**: Add books to a personal wishlist to save for later.
*   **Shopping Cart**: Add books to your cart, adjust quantities, and manage your selection.
*   **Secure Checkout**: A multi-step checkout process with shipping address collection and mock payment integration.
*   **Order Tracking**: View order history and track the status of your purchases (Pending, Approved, Delivered).
*   **Real-time Notifications**: Receive instant alerts when your order status changes.
*   **Live Chat**: Communicate directly with administrators in real-time for support via a floating chat widget.
*   **User Profile**: Manage personal details (Name, Email, Address) with an easy-to-use edit interface.

### For Administrators
*   **Admin Dashboard**: A centralized hub to view and manage all customer orders.
*   **Order Fulfillment**: Approve, Deliver, or Cancel orders. Stock is automatically deducted upon approval.
*   **Customer Insights**: Click on any username in the order list to view their full contact details and shipping address.
*   **Admin Notifications**: Receive alerts whenever a new order is placed.
*   **Live Chat Interface**: A dedicated page to view all user chats and respond in real-time.
*   **Inventory Management**: Add new books, update pricing/stock, and remove outdated items.
*   **Customer Messages**: View inquiries sent by users through the contact form.
*   **Role-Based Access**: Strict security ensuring only admins can access sensitive features.

## 🛠️ Tech Stack

### Frontend
*   **React 18**: Component-based UI library.
*   **Bootstrap 5**: Responsive styling framework.
*   **Framer Motion**: Production-ready animation library.
*   **Axios**: Promise-based HTTP client.
*   **React Router**: Client-side routing.
*   **React Stomp Hooks & SockJS**: For real-time WebSocket communication.
*   **React Icons**: Comprehensive icon library.

### Backend
*   **Java 21**: Core programming language.
*   **Spring Boot 3.5**: Application framework.
*   **Spring Security**: Robust authentication and authorization (RBAC).
*   **Spring WebSocket**: For real-time, two-way communication.
*   **Spring Data MongoDB**: NoSQL database integration.
*   **Maven**: Dependency management.

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

1.  **Register**: Create a new customer account.
    *   **Tip**: Include "admin" in your username (e.g., `superadmin`) to automatically register as an **Administrator**.
2.  **Login**: Access your personalized dashboard.
3.  **Shop**: Browse books, add them to your cart, and proceed to checkout.
4.  **Chat**: Use the floating chat icon to communicate with support.
5.  **Manage**: If logged in as Admin, use the Dashboard to fulfill orders and manage inventory.

## 📂 Project Structure

*   `src/main/java`: Spring Boot Backend
    *   `controller`: REST & WebSocket Controllers (`BookRestController`, `OrderRestController`, `AuthRestController`, `CartRestController`, `NotificationRestController`, `ChatController`)
    *   `domain`: Data Models (`Book`, `User`, `Order`, `Cart`, `Notification`, `ChatMessage`)
    *   `repo`: MongoDB Repositories
    *   `config`: Security & WebSocket Configuration
*   `frontend`: React Frontend
    *   `src/components`: UI Components (`Home`, `BookList`, `Cart`, `Checkout`, `AdminDashboard`, `NotificationDropdown`, `ChatWidget`, `AdminChat`)
    *   `src/context`: State Management (`AuthContext`, `CartContext`)
    *   `public`: Static Assets

## 📄 License

This project is licensed under the MIT License.
