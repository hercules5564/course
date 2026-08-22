const dotenv=require("dotenv");
dotenv.config();

module.exports={
  JWT_USER_SECRET:process.env.JWT_USER_SECRET,
  JWT_ADMIN_SECRET:process.env.JWT_ADMIN_SECRET,
}
