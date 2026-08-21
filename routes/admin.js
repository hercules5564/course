const {Router}=require("express");
const adminRouter=Router();
adminRouter.post("/signup",function(req,res)
{
res.json({
message:"this is signup endpoint"
})
})
adminRouter.post("/signin",function(req,res)
{
res.json({
 message:"this is the signin endpoint"
})
})

adminRouter.get("/course",function(req,res)
{
res.json({
message:"message these are all courses"
})
})
adminRouter.put("/course",function(req,res)
{
res.json({
 message:"change courses endpoint"
})
})
adminRouter.get("/course/bulk",function(req,res)
{
    res.json({
        message:"courses list endpoint"
    })
})
module.exports={
    adminRouter:adminRouter
}