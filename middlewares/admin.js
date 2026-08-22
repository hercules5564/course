const {JWT_ADMIN_SECRET}=require("../config");
const jwt=require("jsonwebtoken");

function userMiddleWare(req,res,next)
{
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_ADMIN_SECRET);
    if(decoded)
    {
        req.userID=decode.id;
        next();
    }
    else{
        res.status(403).json({
            message:"you have signed in"
        })
    }
}
module.exports={
    userMiddleWare
}