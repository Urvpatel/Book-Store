const mongoose = require("mongoose");

//order schema
const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: "user"
    },
    book: {
        type: mongoose.Types.ObjectId, 
        ref: "books"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for delivery", "Delivered", "Canceled"]
    },
    batchId: {
        type: String, 
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('order',order)