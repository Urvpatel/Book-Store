const mongoose = require("mongoose");

//book schema
const book = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0, // default discount is 0%
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true // Each book must belong to a category
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
}, { timestamps: true }); // timestamps for sequential order

// Pre-save hook to calculate the discounted price
book.pre('save', function (next) {
    if (this.discount > 0) {
        this.discountedPrice = this.price - (this.price * (this.discount / 100));
    } else {
        this.discountedPrice = this.price;
    }
    next();
});

module.exports = mongoose.model('books', book);
