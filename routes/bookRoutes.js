const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { addBook, getBooks ,getBookById,deleteBookById,searchBook} = require('../Controllers/bookController');
const { addReview } = require('../Controllers/reviewController');

// POST /api/books/addBook
router.post('/books',authMiddleware, addBook);

// GET /api/books/getBooks
router.get('/books', getBooks);

//Get /api/books/search?query=text
router.get('/books/search',searchBook);

// GET /api/books/ById
router.get('/books/:id', getBookById);

// DELETE /api/books/ById
router.delete('/books/:id', deleteBookById);

router.post('/books/:id/reviews', authMiddleware, addReview); // POST /api/reviews/:bookId


module.exports = router;
