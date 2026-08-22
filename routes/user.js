const { Router }=require("express");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const JWT_USER_SECRET="aladlddf";
const {UserModel}=require("../db");
const {z}=require("zod");
const  bcrypt=require("bcrypt");
userRouter.post("/signup",async function(req,res)
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
    await UserModel.create({
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
      message: "email already exists",
    });
  }
});







// function userauth(req,res,next)
// {
// const token = req.headers.token;
//   const decoded = jwt.verify(token, JWT_SECRET);
//   if (decoded) {
//     req.userId = decoded.id;
//     next();
//   } else {
//     res.json({
//       message: "you are not allowed",
//     });
//   }
// }




userRouter.post("/signin",async function(req,res)
{
const email = req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({
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
      JWT_USER_SECRET,
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




userRouter.post("/purchases",function(req,res)
{

})
module.exports={
  userRouter:userRouter
}