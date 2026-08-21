const mongoose=require("mongoose");
const { object } = require("zod");
const Schema=mongoose.Schema;
const ObjectID=Schema.Types.ObjectId;

const user=new Schema({
    _id:ObjectID,
    email:{type:String,unique:true},
    firstName:String,
    lastName:String,
    password:String,
})
const admin=new Schema({
_id:ObjectID,
email:{type:String,unique:true},
firstName:String,
LastName:String,
password:String,
})
const courses=new Schema({
    _id:ObjectID,
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectID,
})
const purchase=new Schema({
   _id:ObjectID,
   courseId:ObjectID,
   userId:ObjectID,

})
const UserModel=mongoose.model("users",user);
const adminModel=mongoose.model("admins",admin);
const coursesModel=mongoose.model("courses",courses);
const purchaseModel=mongoose.model("purchases",purchase);

module.exports={
    UserModel:UserModel,
    adminModel:adminModel,
    coursesModel:coursesModel,
    purchaseModel:purchaseModel,
}