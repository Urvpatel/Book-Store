const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/category');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
