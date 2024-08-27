const router = require("express").Router();
const User=require("../models/user")
const Book= require('../models/book')
const {authenticateToken}= require('./userAuth'); 
//add book by admin
// In your backend route
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You don't have access to do admin work" });
        }

        const { url, title, author, price, desc, language, quantity, discount, category } = req.body;

        const book = new Book({
            url,
            title,
            author,
            price,
            desc,
            language,
            quantity,
            discount: discount || 0,
            discountedPrice: price - (price * (discount / 100)),
            category, // Reference the category
        });

        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

//update book put is used becoz of update
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const updatedData = {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            quantity: req.body.quantity,
            discount: req.body.discount || 0,
            category: req.body.category, // Update category
        };

        if (updatedData.discount > 0) {
            updatedData.discountedPrice = updatedData.price - (updatedData.price * (updatedData.discount / 100));
        } else {
            updatedData.discountedPrice = updatedData.price;
        }

        await Book.findByIdAndUpdate(bookid, updatedData);
        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error has occurred" });
    }
});

// Get all books by category
router.get("/books-by-category/:categoryId", async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.categoryId }).sort({ createdAt: -1 });
        res.json({ status: "success", data: books });
    } catch (error) {
        res.status(500).json({ message: "An error has occurred", error: error.message });
    }
});

//search book by title
router.get("/search-books", async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const books = await Book.find({ title: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json({ data: books });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for books", error: error.message });
    }
});
// Delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});

// Get all books 
router.get("/get-all-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).populate('category', 'name');
        return res.json({ status: "success", data: books });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});

//get 2 books 
router.get("/get-recent-book", async (req,res) =>{
    try{
        const books= await Book.find().sort({ createdAt: -1}).limit(4);
        return res.json({stauts:"success",data:books})}
    catch(error){
        return res.status(500).json({message :"An error has occured"})
    }
})
//particular book
router.get("/get-book-by-id/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const book= await Book.findById(id)
        return res.json({status:"success",data:book})}
    catch(error){
        return res.status(500).json({message :"An error has occured"})
    }
})
module.exports =router;
