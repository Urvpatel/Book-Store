const router = require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt= require('jsonwebtoken')
const {authenticateToken}= require('./userAuth');


//sign Up
router.post("/sign-up",async (req,res)=>{
    try{
        const { username , email , password , address}=req.body

        //check lenght of username
        if(username.length < 4)
        {
            return res.status(400).json({message:"Username should be greater than 4"})
        }

        //check username already exists
        const existingUsername = await User.findOne({username: username})
        if(existingUsername)
        {
            return res.status(400).json({message:"Username already there"})  
        }

        //check email already exists
        const existingEmail = await User.findOne({email: email})
        if(existingEmail)
        {
            return res.status(400).json({message:"Email already there"})  
        }

        //check password lenght >=5
        if(password.length <= 5)
            {
                return res.status(400).json({message:"Password should be greater than 5"})
            }
        const hashPass=await bcrypt.hash(password,10)
        const newUser= new User({
            username:username,
            email:email,
            password:hashPass,
            address:address,

        });
        await newUser.save()
        return res.status(200).json({message:"SignUp Successfully"})
    }
    catch(error){
        res.status(500).json({message :"Internal server error"})//500 is for backend error
    }
})

//sign in 
router.post("/sign-in",async (req,res)=>{
    try{
        const {username,password}=req.body;
        const existingUsername= await User.findOne({username})

        if(!existingUsername){
            res.status(400).json({message :"Invalid Credientials"})
        }

        await bcrypt.compare(password,existingUsername.password,(err,data)=>{
            if(data){
                const authClams=[
                    {name:existingUsername.username},{role:existingUsername.role }
                ]
                const token= jwt.sign({authClams},"LMS123",{expiresIn:'30d'});
                res.status(200).json({id :existingUsername._id,role:existingUsername.role,token:token})
            }
            else{
                res.status(400).json({message :"Invalid Credientials"})
            }
        })
    }
    catch(error){
        res.status(500).json({message :"Internal server error"})//500 is for backend error
    }
})

//get user information 
router.get("/get-user-information",authenticateToken,async (req,res)=>{
    try{
    const {id} = req.headers;
    const data= await User.findById(id).select('-password')//-password will exclude in the information
    return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message :"Internal server error"})//500 is for backend error
    }

})

//update the address 
router.put('/update-address',authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address})
        return res.status(200).json({message:"Address updated successfully"});
        }
        catch(error){
            res.status(500).json({message :"Internal server error"})//500 is for backend error
        }
})
module.exports=router;
