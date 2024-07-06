const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Listing=require('../models/listing');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        maxLength:10,
        minLength:10
    },
    profilePic:{
            url:String,
            filename:String  
    },
    favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Listing'
    }]
})

userSchema.plugin(passportLocalMongoose);

const User=new mongoose.model("User",userSchema);

module.exports=User;