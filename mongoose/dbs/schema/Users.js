const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  UserId : {type:ObjectId},
  userName:{unique:true,type:String},
  password:String,
  gender:Number,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
},{collection:'users'})

const model = {
  Users:mongoose.model('Users',userSchema)
}

// 发布模型
module.exports = model