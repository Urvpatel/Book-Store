const jwt= require("jsonwebtoken")

const authenticateToken = (req,res,next)=>{
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null){
        return res.status(401).json({message:'Authentication token required'})
    }
    jwt.verify(token,"LMS123",(err,user)=>{
        if(err){
            return res.status(403).json({message:"Token Expire Please Login Again"})
        }
        req.user=user;
        next();
    })
}
module.exports={authenticateToken};

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// };

// module.exports = { authenticateToken };
