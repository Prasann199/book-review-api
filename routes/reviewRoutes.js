const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addReview, getReviews, updateReview, deleteReview } = require('../Controllers/reviewController');

router.post('/books/:id/reviews', authMiddleware, addReview); // POST /api/reviews/:bookId
router.get('/getReview/:bookId', getReviews); // GET /api/reviews/:bookId
router.put('/:id', authMiddleware, updateReview); // put /api/reviews/:bookId
router.delete('/:id', authMiddleware, deleteReview); // POST /api/reviews/:bookId
module.exports = router;
