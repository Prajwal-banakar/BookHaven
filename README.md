# Book Inventory System

A modern, full-stack web application for managing a book inventory. This system features a robust Spring Boot backend and a dynamic, interactive React frontend.

## Features

*   **Modern UI/UX**: Built with React, Bootstrap 5, and Framer Motion for smooth animations and a responsive design.
*   **Secure Authentication**: User registration and login powered by Spring Security and JWT-ready architecture.
*   **Dashboard**: Interactive home page with quick access to key features.
*   **Book Management**:
    *   **Add Book**: Create new entries with auto-generated IDs.
    *   **View Books**: Browse the collection in a responsive grid layout.
    *   **Search**: Instantly find books by ID.
    *   **Delete**: Remove books with confirmation dialogs.
*   **REST API**: Fully decoupled backend serving JSON data.

## Tech Stack

### Frontend
*   **React 18**: Component-based UI library.
*   **Bootstrap 5**: Responsive styling framework.
*   **Framer Motion**: Production-ready animation library.
*   **Axios**: Promise-based HTTP client.
*   **React Router**: Client-side routing.

### Backend
*   **Java 21**: Core programming language.
*   **Spring Boot 3.5**: Application framework.
*   **Spring Security**: Authentication and authorization.
*   **Spring Data MongoDB**: NoSQL database integration.
*   **Maven**: Dependency management.

## Getting Started

### Prerequisites
*   Java JDK 21+
*   Node.js & npm
*   MongoDB (running locally on default port 27017)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd BookApplication
    ```

2.  **Backend Setup**
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

3.  **Frontend Setup**
    Open a new terminal:
    ```bash
    cd frontend
    npm install
    npm start
    ```
    The frontend will open automatically at `http://localhost:3000`.

## Usage

1.  Navigate to `http://localhost:3000`.
2.  **Register** a new account.
3.  **Login** with your credentials.
4.  Use the dashboard to manage your inventory.

## Project Structure

*   `src/main/java`: Spring Boot Backend
    *   `controller`: REST Controllers (`BookRestController`, `AuthRestController`)
    *   `config`: Security configuration
    *   `domain`: Data models
*   `frontend`: React Frontend
    *   `src/components`: React components (`Home`, `BookList`, etc.)
    *   `src/context`: State management (`AuthContext`)
    *   `public`: Static assets

## License

This project is licensed under the MIT License.
