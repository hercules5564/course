const {Router}=require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_SECRET}=require("../config");
const {z}=require("zod");
const {adminModel,courseModel}=require("../db");
const bcrypt=require("bcrypt");
const {adminMiddleWare}=require("../middlewares/admin");
adminRouter.post("/signup",async function(req,res)
{
const requiredBody = z.object({
    email: z.email().min(3).max(100),
     password: z.string().min(3).max(30),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
   
  });
   const parsedDatawithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDatawithSuccess.success) {
    res.json({
      message: "Incorrect format",
      error: parsedDatawithSuccess.error,
    });
    return;
  }
 const {email ,password ,firstName,lastName}=req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName:lastName
    });
    res.json({
      message: "You have signed up",
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "something went wrong",
    });
  }
})


adminRouter.post("/signin",async function(req,res)
{
const email = req.body.email;
  const password = req.body.password;
  const user = await adminModel.findOne({
    email: email,
  });
  console.log(user);
if (!user) return res.status(403).json({ message: "incorrect credentials" });
  const passwordmatch = await bcrypt.compare(password, user.password);
  if (passwordmatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_ADMIN_SECRET,
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "incorrect credentials",
    });
  }
})
 


adminRouter.post("/course",adminMiddleWare,async function(req,res)
{
const adminId=req.userId;
const {title,description,price,imageUrl}=req.body;

const course =await courseModel.create({
    title:title,
    description:description,
    price:price,
    imageUrl:imageUrl,
    creatorId:adminId
})
res.json({
    message:"course created",
    courseId:course._id
})
})
adminRouter.put("/course",adminMiddleWare,async function(req,res)
{
  const adminId=req.userId;
  const {courseId,title,description,price,imageUrl}=req.body;

await courseModel.updateOne({
  _id:courseId,
  creatorId:adminId
},{
    title:title,
    description:description,
    price:price,
    imageUrl:imageUrl
})
res.json({
    message:"course updated",
    courseId:courseId
})
})
adminRouter.get("/course/bulk",adminMiddleWare,async function(req,res)
{
 const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "courses fetched",
        courses
    })
})
module.exports={
    adminRouter:adminRouter
}
