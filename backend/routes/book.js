const router = require("express").Router();
const User=require("../models/user")
const Book= require('../models/book')
const {authenticateToken}= require('./userAuth'); 
//add book by admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You don't have access to do admin work" });
        }

        const { url, title, author, price, desc, language, quantity, discount, category, subcategory } = req.body;

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
            subcategory // Reference the subcategory
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
            subcategory: req.body.subcategory // Update subcategory
        };

        if (updatedData.discount > 0) {
            updatedData.discountedPrice = updatedData.price - (updatedData.price * (updatedData.discount / 100));
        } else {
            updatedData.discountedPrice = updatedData.price;
        }

        const updatedBook = await Book.findByIdAndUpdate(bookid, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "An error has occurred", error: error.message });
    }
});


// Get all books by category
// Backend: Get books by category and optionally by subcategory
router.get("/books-by-category/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { subCategoryId } = req.query;

        let filter = { category: categoryId };

        if (subCategoryId) {
            filter['subcategories'] = subCategoryId;
        }

        const books = await Book.find(filter).sort({ createdAt: -1 });
        res.json({ status: "success", data: books });
    } catch (error) {
        res.status(500).json({ message: "An error has occurred", error: error.message });
    }
});




// Get all books by category and subcategory
router.get("/books-by-category/:categoryId/:subcategoryId", async (req, res) => {
    try {
        const { categoryId, subcategoryId } = req.params;
        const books = await Book.find({
            category: categoryId,
            subcategory: subcategoryId
        }).sort({ createdAt: -1 });
        
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

//search book by title or author
router.get("/search-books", async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const books = await Book.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.status(200).json({ data: books });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for books", error: error.message });
    }
});

module.exports =router;
