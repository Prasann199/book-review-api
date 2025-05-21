const Book = require('../Models/Book');
const Review = require('../Models/Review');

exports.addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const review = new Review({
      book: req.params.id,
      user: req.user, // from authMiddleware
      comment,
      rating
    });

    await review.save();
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding review" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

exports.updateReview = async (req, res) => {
    try {
        const id= req.params.id;
        const { comment, rating } = req.body;

        // Find the review by ID and check if it belongs to the book
        const review = await Review.findOne({ _id: id});

        if (!review) {
            return res.status(404).json({ message: "Review not found for this book" });
        }

        // Update the review fields
        if (comment !== undefined) review.comment = comment;
        if (rating !== undefined) review.rating = rating;

        await review.save();

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating the review." });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the review by ID and ensure it belongs to the book
        const review = await Review.findOne({ _id: id});

        if (!review) {
            return res.status(404).json({ message: "Review not found for this book." });
        }

        // Delete the review
        await Review.deleteOne({ _id: id });

        res.status(200).json({ message: "Review deleted successfully.", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting the review." });
    }
};
