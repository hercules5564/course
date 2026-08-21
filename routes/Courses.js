const {Router}=require("express");
const coursesRouter=Router();

coursesRouter.post("/purchase",function(req,res)
{
    
})
coursesRouter.get("/preview",function(req,res)
{
    res.json({
        message:"or bhai"
    })
})

module.exports={
    coursesRouter:coursesRouter
}