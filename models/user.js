const mongoose=require('mongoose');

const Schema=mongoose.Schema;


// schema database
const userSchema=new Schema({
    email:{
        type:String ,
        required:true
    },
    password:{
        type:String ,
        required:true
    }
})
//create table in monggose database name users

module.exports=mongoose.model('users',userSchema)