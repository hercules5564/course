const express=require("express");
const app=express();
const dotenv = require('dotenv');
dotenv.config();
const { userRouter }=require("./routes/user");
const {coursesRouter}=require("./routes/Courses");
const {adminRouter}=require("./routes/admin");
const {z}=require("zod");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
// const {adminModel}=require("../db");
const {userModel,adminModel,coursesModel,purchaseModel}=require("./db");



app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/courses",coursesRouter);
app.use("/api/v1/admin",adminRouter);

// app.post("/adminsignup",async function(req,res)
// {
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
//     const hashedPassword =  bcrypt.hash(password, 5);
//     console.log(hashedPassword);
//     await adminModel.create({
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
// })
// function adminauth(req,res,next)
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
// app.post("/adminsignin",adminauth,function(req,res)
// {
// const email = req.body.email;
//   const password = req.body.password;
//   const admin = await adminModel.findOne({
//     email: email,
//   });
//   console.log(admin);

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
// })

// app.post("/createcourse",adminauth,function(req,res)
// {

// })
// app.post("/deletecourse",adminauth,function(req,res)
// {

// })
// app.post("/addcontent",adminauth,function(req,res)
// {

// })
async function main()
{
await mongoose.connect(process.env.DATABASE_URL);
app.listen(3000, () => {
  console.log(`Server is running `);
});
}
main();
