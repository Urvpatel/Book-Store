const router = require("express").Router();
const { authenticateToken } = require('./userAuth');
const Book = require('../models/book');
const Order = require('../models/order');
const User = require("../models/user");
const mongoose = require("mongoose");

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        const batchId = new mongoose.Types.ObjectId().toString(); // Unique batchId for this request

        for (const orderData of order) {
            const book = await Book.findById(orderData.bookId); // Ensure we fetch the correct book by ID
            if (!book) {
                return res.status(400).json({ status: "error", message: "Book not found" });
            }

            // Check if there is enough quantity available
            if (orderData.quantity > book.quantity) {
                return res.status(400).json({ status: "error", message: `Not enough copies of ${book.title} available. Only ${book.quantity} left.` });
            }

            const totalPrice = book.price * orderData.quantity;

            const newOrder = new Order({
                user: id,
                book: orderData.bookId,
                quantity: orderData.quantity,
                totalPrice: totalPrice,
                batchId: batchId,
            });

            const orderDataFromDb = await newOrder.save();

            // Save the order in the user's order list
            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });

            // Clear the book from the user's cart
            await User.findByIdAndUpdate(id, { $pull: { cart: orderData.bookId } });

            // Reduce the quantity of the book in the database
            await Book.findByIdAndUpdate(orderData.bookId, { $inc: { quantity: -orderData.quantity } });
        }

        return res.json({ status: "success", message: "Order placed successfully" });
    } catch (error) {
        console.error("Error in placing order:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ path: 'orders', populate: { path: 'book' } });
        const orderData = userData.orders.reverse();
        return res.json({ status: "success", data: orderData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});

// Get all orders for admin
router.get("/get-all-order", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: 'book' }).populate({ path: 'user' }).sort({ createdAt: -1 });
        return res.json({ status: "success", data: userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error has occurred" });
    }
});

// Admin update order status
router.put("/status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({ status: "success", message: "Status updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error has occurred" });
    }
});

module.exports = router;
