const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
})
.catch(err => console.log(err));
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));



