const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
require('./conn/conn');
const user = require('./routes/user');
const books = require('./routes/book');
const favourite = require('./routes/favourite');
const cart = require('./routes/cart');
const order = require('./routes/order');
const category = require('./routes/category');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1', user);
app.use('/api/v1', books);
app.use('/api/v1', favourite);
app.use('/api/v1', cart);
app.use('/api/v1', order);
app.use('/api/v1', category);

// Multer configuration (if not in category router)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Image upload route
app.post('/api/v1/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
});

// Create port
app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT}`);
});
