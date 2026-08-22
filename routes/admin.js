const {Router}=require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const {JWT_ADMIN_SECRET}=require("../config");
const {z}=require("zod");
const {adminModel}=require("../db");
const {coursesModel}=require("../db");
const bcrypt=require("bcrypt");
const {userMiddleWare}=require("../middlewares/admin")
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
 

adminRouter.get("/course",userMiddleWare,async function(req,res)
{
const adminId=req.userId;
const {title,decription,price,imageUrl}=req.body;

const course =await coursesModel.create({
  title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:adminId
})
res.json({
    message:"course created",
    courseID:course.id
})
})
adminRouter.put("/course",async function(req,res)
{

  const adminId=req.userId;
  const {title,decription,price,imageUrl}=req.body;
const course =await coursesModel.updateOne({
  _id:courseId,
courseID:adminId
},{
  title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:adminId
})
res.json({
    message:"course created",
    courseID:course.id
})
})
adminRouter.get("/course/bulk",async function(req,res)
{
 const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})
module.exports={
    adminRouter:adminRouter
}