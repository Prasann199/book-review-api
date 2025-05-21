const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addReview, getReviews, updateReview, deleteReview } = require('../Controllers/reviewController');

router.post('/books/:id/reviews', authMiddleware, addReview); // POST /api/reviews/:bookId
router.get('/getReview/:bookId', getReviews); // GET /api/getReviews/:bookId
router.put('/:id', authMiddleware, updateReview); // put /api/reviews/:id
router.delete('/:id', authMiddleware, deleteReview); // DELETE /api/reviews/:id
module.exports = router;
