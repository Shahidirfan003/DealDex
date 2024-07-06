const mongoose = require('mongoose');

const reviewSchema= new mongoose.Schema({
    comment:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
    rating:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" //with reference to User model
    },
});

const Review=new mongoose.model("Review",reviewSchema);

module.exports=Review;