const jwt=require("jsonwebtoken");
const {JWT_USER_SECRET}=require("../config");

function userMiddleware(req,res,next)
{
    const token=req.headers.token;
    try{
        const decoded=jwt.verify(token,JWT_USER_SECRET);
        req.userId=decoded.id;
        next();
    }
    catch(e){
        res.status(403).json({
            message:"you are not signed in"
        })
    }
}
module.exports={
    userMiddleware
}
