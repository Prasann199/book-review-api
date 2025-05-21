📚 Book Review API
A RESTful API built with Node.js and Express.js for managing books, user reviews, and authentication using JWT.

🔧 Tech Stack

1.Backend: Node.js, Express.js

2.Database: MongoDB (with Mongoose)

3.Authentication: JWT (JSON Web Token)

4.Environment Configuration: dotenv

🚀 Features
✅ User Signup and Login with JWT Authentication

✅ Add, View, and Search Books

✅ Review Books (one review per user per book)

✅ Update and Delete Your Reviews

✅ Pagination for books and reviews

✅ Filter books by author or genre

✅ Search books by title or author (case-insensitive)

🛠️ Setup Instructions

Clone the repository


bash

git clone https://github.com/Prasann199/book-review-api.git

cd book-review-api

Install dependencies


bash

npm install

Create a .env file based on .env.example


in it

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

Run the server


bash

npm start

📬 API Endpoints

🧑‍💻 Authentication

POST /signup – Register a new user


POST /login – Login and receive JWT token


📘 Books

POST /books – Add a new book (requires JWT)


GET /books – List all books (supports pagination and filter by author/genre)


GET /books/:id – Get book details including average rating and reviews


✍️ Reviews

POST /books/:id/reviews – Add a review (only one per user)


PUT /reviews/:id – Update your own review


DELETE /reviews/:id – Delete your own review


🔍 Search

GET /search?query=xyz – Search by book title or author (case-insensitive)


🧪 Sample Requests

Signup

bash

curl -X POST http://localhost:5000/signup -H "Content-Type: application/json" -d '{"username":"john","password":"123456"}'

Login

bash

curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"username":"john","password":"123456"}'

🗄️ Database Schema (MongoDB)

User

{
  username: String,
  
  email: String,
  
  password: String (hashed)
  
}

Book

js


{
  title: String,
  
  author: String,
  
  genre: String,
  
}

Review
js

{
  user: ObjectId,
  
  book: ObjectId,
  
  rating: Number (1–5),
  
  comment: String
  
}

📌 Design Decisions

JWT used for stateless authentication.


MongoDB chosen for simplicity and ease of setup with Mongoose.


A user can only review a book once to prevent rating spam.


👤 Author

Prasann Malanaik

Email: prasannmalanaik@gmail.com

