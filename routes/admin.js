const {Router}=require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const JWT_ADMIN_SECRET="asjffsjl";
const {z}=require("zod");
const {adminModel}=require("../db");
const bcrypt=require("bcrypt");
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