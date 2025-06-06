````markdown
## 📚 Book Review Backend API

An Express-based RESTful API for managing books and user-submitted reviews. This backend service supports user authentication, book cataloging, reviews, and search functionalities.

---

## 🚀 Features

- User Signup & Login (JWT-based authentication)
- Add, fetch, and search books
- Submit, update, and delete reviews
- Pagination and filtering support

---

## 📦 Project Setup

1. **Clone the repository**

```bash
git clone https://github.com/Bhuminandan/bookreview
cd bookreview
```
````

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory based on the provided `.env.sample`:

```bash
cp .env.sample .env
```

Update values in `.env` as needed (like `DB_URL`, `JWT_SECRET`, etc.).

---

## 🧪 Running Locally

1. **Start the development server**

```bash
npm run dev
```

2. **Server will run at**

```
http://localhost:3000
```

---

## 🔌 API Usage

### 🔐 Auth

**Register**

```bash
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "email": "test@user.com",
  "name": "Test User",
  "password": "test2F@dssf"
}'
```

**Login**

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@user.com",
  "password": "test2F@dssf"
}'
```

---

### 📖 Books

**Get all books (paginated)**

```bash
curl -X GET "http://localhost:3000/api/books?page=1&size=2" \
-H "Authorization: Bearer <JWT_TOKEN>"
```

**Get book details (with reviews)**

```bash
curl -X GET "http://localhost:3000/api/books/<BOOK_ID>?page=1&size=10" \
-H "Authorization: Bearer <JWT_TOKEN>"
```

**Create a book**

```bash
curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic",
  "created_by": "<USER_ID>"
}'
```

**Search books**

```bash
curl -X GET http://localhost:3000/api/books/search \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Harry",
  "author": "ch"
}'
```

---

### 📝 Reviews

**Submit a review**

```bash
curl -X POST http://localhost:3000/api/books/<BOOK_ID>/reviews \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rating": 5,
  "comment": "Amazing read!"
}'
```

**Update a review**

```bash
curl -X PUT http://localhost:3000/api/reviews/<REVIEW_ID> \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rating": 4,
  "comment": "Changed my mind, still good!"
}'
```

**Delete a review**

```bash
curl -X DELETE http://localhost:3000/api/reviews/<REVIEW_ID> \
-H "Authorization: Bearer <JWT_TOKEN>"
```

---

## 📂 Postman Collection

You can import the full collection using the provided Postman file:

**`Book Review.postman_collection.json`**
✅ Includes login, register, create/read/update books and reviews.

To use:

1. Open Postman
2. Click **Import** > Upload the `.json` file
3. Set your JWT token in the **Authorization** tab or use environment variables

---

## 🧠 Design Decisions & Assumptions

- **Authentication**: JWT-based login. All book and review APIs are protected except `/auth` routes.
- **Data Validation**: Basic validation with `express-validator`. Extendable for production-grade validation.
- **Pagination**: Implemented for book listings and reviews under query params `?page=1&size=10`.
- **Filtering**: Books can be filtered using title, author, and genre.
- **Review Updates**: Only the creator of a review can update or delete it.
- **Database**: Assumes a PostgreSQL instance, connection configured in `.env`.

---

## 🪪 License

MIT

---
