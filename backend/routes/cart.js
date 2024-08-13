const router = require("express").Router();
const User=require("../models/user")
const {authenticateToken}= require('./userAuth'); 

//add to cart  
router.put("/add-to-cart", authenticateToken , async (req,res) =>{
    try{
        const {bookid,id} = req.headers;
        const userData= await User.findById(id)
        const isBookinCart = userData.cart.includes(bookid)
        if (isBookinCart)
        {
           return res.status(200).json({stats:"success",message: "Book is already in cart"})
        }
        await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
        return res.status(200).json({stats:"success",message: "Book is added to cart"})
    }
        catch(error){
        res.status(500).json({message :"Internal server error"})
    }
})

//delete from cart
router.put("/delete-book-from-cart/:bookid", authenticateToken , async (req,res) =>{
    try{
        const {bookid} = req.params;
        const {id}= req.headers;
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}})
        
        return res.status(200).json({status:"success", message: "Book is removed from cart"})
    }
        catch(error){
        res.status(500).json({message :"Internal server error"})
    }
})

////get cart of a particular user
router.get("/get-user-cart", async (req,res) =>{
    try{
        const {id} = req.headers;
        const userData= await User.findById(id).populate('cart')//populate is used to give refrence of book model to fetch all info
        const cart = userData.cart.reverse();//reverse is used for retriving the cart data on top
        return res.json({status:"success",data:cart})}
    catch(error){
        return res.status(500).json({message :"An error has occured"})
    }
})
module.exports = router;