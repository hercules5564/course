const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectID=mongoose.Types.ObjectId;

const user=new Schema({
    email:{type:String,unique:true},
    firstName:String,
    lastName:String,
    password:String,
})
const admin=new Schema({

email:{type:String,unique:true},
password:String,
firstName:String,
lastName:String,

})
const courses=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectID,
})
const purchase=new Schema({
   courseId:mongoose.Types.ObjectId,
   userId:mongoose.Types.ObjectId,

})
const UserModel=mongoose.model("users",user);
const adminModel=mongoose.model("admins",admin);
const courseModel=mongoose.model("courses",courses);
const purchaseModel=mongoose.model("purchases",purchase);

module.exports={
    UserModel,
    adminModel,
    courseModel,
    purchaseModel,
}
