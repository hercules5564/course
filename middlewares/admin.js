const {JWT_ADMIN_SECRET}=require("../config");
const jwt=require("jsonwebtoken");

function adminMiddleWare(req,res,next)
{
    const token=req.headers.token;
    try{
        const decoded=jwt.verify(token,JWT_ADMIN_SECRET);
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
    adminMiddleWare
}
