const { Router }=require("express");
const userRouter=Router();




userRouter.post("/signup",async function(req,res)
{
//  const requiredBody = z.object({
//     email: z.string().min(3).max(100).email(),
//     username: z.string().min(3).max(100),
//     password: z.string().min(3).max(30),
//   });
//    const parsedDatawithSuccess = requiredBody.safeParse(req.body);
//   if (!parsedDatawithSuccess.success) {
//     res.json({
//       message: "Incorrect format",
//       error: parsedDatawithSuccess.error,
//     });
//     return;
//   }
//   const email = req.body.email;
//   const password = req.body.password;
//   const username = req.body.username;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 5);
//     console.log(hashedPassword);
//     await UserModel.create({
//       email: email,
//       password: hashedPassword,
//       username: username,
//     });
//     res.json({
//       message: "You have signed up",
//     });
//   } catch (e) {
//     res.json({
//       message: "email already exists",
//     });
//   }

res.json({
  msg:"agya signup krne"
})
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
// const email = req.body.email;
//   const password = req.body.password;
//   const user = await UserModel.findOne({
//     email: email,
//   });
//   console.log(user);

//   const passwordmatch = await bcrypt.compare(password, user.password);
//   if (passwordmatch) {
//     const token = jwt.sign(
//       {
//         id: user._id.toString(),
//       },
//       JWT_SECRET,
//     );
//     res.json({
//       token: token,
//     });
//   } else {
//     res.status(403).json({
//       message: "incorrect credentials",
//     });
//   }
})




userRouter.post("/purchases",function(req,res)
{

})
module.exports={
  userRouter:userRouter
}