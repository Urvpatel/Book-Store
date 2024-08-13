const router = require("express").Router();
const { authenticateToken } = require('./userAuth');
const Book = require('../models/book')
const Order = require('../models/order')
const User = require("../models/user")

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id })
            const orderDataFromdb = await newOrder.save()

            //saving order in user model
            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromdb._id } })

            //clearing cart
            await User.findById(id, { $pull: { cart: orderData._id } })
        }
        return res.status(200).json({ stats: "success", message: "order placed successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

//order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ path: 'cart', populate: { path: 'book' } })
        const orderData = userData.orders.reverse();
        return res.json({ status: "success", data: orderData })
    }
    catch (error) {
        return res.status(500).json({ message: "An error has occured" })
    }
})

//get-all-orders for admin
router.get("/get-all-order", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: 'book'}).populate({path:'user'}).sort({createdAt: -1})
        return res.json({ status: "success", data: userData })
    }
    catch (error) {
        return res.status(500).json({ message: "An error has occured" })
    }
})

//admin update order like stauts of order
router.put("/status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id,{status: req.body.status})
        return res.json({ status: "success", message: "Status updated successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "An error has occured" })
    }
})

module.exports = router;