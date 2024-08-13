const mongoose = require("mongoose");

//order schema
const order = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId, 
        ref:"user"
    },
    book:{
        type: mongoose.Types.ObjectId, 
        ref:"books",
    },
    status:{
        type: String,
        default:"Order Placed",
        enum:["Order Placed","Out for deliery","Delivered","Canceled"]
    }
},{timestamps:true});//timestamps for sequencial order
module.exports = mongoose.model('order',order)