const { default: mongoose } = require('mongoose');
const Book = require('../Models/Book');
const Review = require('../Models/Review');

exports.addBook=async (req, res) => {
  try {
    const { title, author, description } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      createdBy: req.user  // This is the user ID from the token
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while adding book' });
  }
};

exports.getBooks=async(req,res)=>{
    try{
        const out=await Book.find();
        res.status(200).json(out);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error while getting book' });
    }
}

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Reviews per page
    const skip = (page - 1) * limit;

    // Fetch the book
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Fetch reviews for the book (with pagination)
    const reviews = await Review.find({ book: bookId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: latest first

    // Calculate average rating
    const avgResult = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: '$book', averageRating: { $avg: '$rating' } } }
    ]);

    const averageRating = avgResult.length > 0 ? avgResult[0].averageRating : 0;

    // Total reviews count
    const totalReviews = await Review.countDocuments({ book: bookId });

    res.status(200).json({
      message: `Fetched successfully! ${bookId}`,
      book,
      averageRating: averageRating.toFixed(1),
      reviews,
      totalReviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit)
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


exports.deleteBookById=async(req,res)=>{
    try{
        const id=req.params.id;
        const out=await Book.findById(id);
        await Book.deleteOne(out);
        res.status(200).json({message:"deleted SuccessFully!",Book:out})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"server error while deleting the book."})
    }
}
exports.searchBook = async (req, res) => {
  try {
    const query = req.query.query;

    // Case-insensitive search by title or author
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
