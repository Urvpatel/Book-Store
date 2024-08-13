const router = require("express").Router();
const User=require("../models/user")
const {authenticateToken}= require('./userAuth'); 

//add book to favourite
router.put("/add-book-to-fav", authenticateToken , async (req,res) =>{
    try{
        const {bookid,id} = req.headers;
        const userData= await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid)
        if (isBookFavourite)
        {
           return res.status(200).json({stats:"success",message: "Book is already in favourites"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
        return res.status(200).json({stats:"success",message: "Book is added to favourites"})
    }
        catch(error){
        res.status(500).json({message :"Internal server error"})
    }
})

//delete book from favourite
router.put("/delete-book-from-fav", authenticateToken , async (req,res) =>{
    try{
        const {bookid,id} = req.headers;
        const userData= await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid)
        if (isBookFavourite)
        {
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
        }
        
        return res.status(200).json({message: "Book is removed from favourites"})
    }
        catch(error){
        res.status(500).json({message :"Internal server error"})
    }
})

//get fav books of a particular user
router.get("/get-favourite-books", async (req,res) =>{
    try{
        const {id} = req.headers;
        const userData= await User.findById(id).populate('favourites')//populate is used to give refrence of book model to fetch all info
        const favouriteBooks = userData.favourites;
        return res.json({status:"success",data:favouriteBooks})}
    catch(error){
        return res.status(500).json({message :"An error has occured"})
    }
})
module.exports = router;