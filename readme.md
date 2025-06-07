# 📚 Book Review Backend API

A robust Express.js RESTful API for managing books and user reviews with secure authentication, comprehensive CRUD operations, and advanced filtering capabilities.

![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Key Features

| Feature                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| 🔐 **Secure Auth**     | JWT-based user authentication with role management     |
| 📖 **Book Management** | Full CRUD operations for books with search & filtering |
| 📝 **Review System**   | Users can submit, update, and delete their reviews     |
| ⚡ **Performance**     | Pagination and optimized queries for large datasets    |
| 🛡️ **Validation**      | Comprehensive input validation for all endpoints       |

## 🛠️ Installation & Setup

### Prerequisites

- Node.js v18+
- PostgreSQL
- npm/yarn

### 1. Clone Repository

```bash
git clone https://github.com/Bhuminandan/bookreview.git
cd bookreview
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.sample .env
```

## 🚀 Running the Server

### Development Mode (with hot-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

## 🧰 Postman Collection

Streamline your API testing with our ready-to-use Postman collection. The `Book Review.postman_collection.json` file is included in the project's root directory for your convenience.

### 📥 How to Use:

1. **Download the Collection**  
   Locate `Book Review.postman_collection.json` in the project's root folder

2. **Import into Postman**

   - Open Postman
   - Click **Import** > **Upload Files**
   - Select the downloaded JSON file

3. **Configure Authentication**
   - First, obtain your JWT token by calling the `POST /api/auth/login` endpoint
   - Set this token as a Bearer token in the Authorization tab

### Authentication

| Endpoint           | Method | Description         |
| ------------------ | ------ | ------------------- |
| `/api/auth/signup` | POST   | Register new user   |
| `/api/auth/login`  | POST   | Login existing user |

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securePassword123!"}'
```

### Books Endpoints

| Endpoint            | Method | Description                   |
| ------------------- | ------ | ----------------------------- |
| `/api/books`        | GET    | Get paginated book list       |
| `/api/books/search` | GET    | Search books with filters     |
| `/api/books`        | POST   | Add new book                  |
| `/api/books/:id`    | GET    | Get book details with reviews |

**Example Pagination:**

```bash
curl -X GET "http://localhost:3000/api/books?page=1&size=5" \
  -H "Authorization: Bearer your.jwt.token"
```

### Reviews Endpoints

| Endpoint                     | Method | Description   |
| ---------------------------- | ------ | ------------- |
| `/api/books/:bookId/reviews` | POST   | Add review    |
| `/api/reviews/:reviewId`     | PUT    | Update review |
| `/api/reviews/:reviewId`     | DELETE | Remove review |

Here's the improved Postman section with your requested additions:

## 🏗️ Architecture

### Key Components

- **Authentication**: JWT with refresh token support
- **Database**: PostgreSQL with Sequelize ORM
- **Validation**: Express-validator middleware
- **Error Handling**: Custom error classes and middleware
- **Pagination**: Offset-based with page/size parameters

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
