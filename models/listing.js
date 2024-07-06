const mongoose = require('mongoose');
const Review=require("../models/review");
const { number } = require('joi');


const listingSchema=new mongoose.Schema({
    image:{
        url:String,
        filename:String
    },
    title:String,
    description:String,
    price:Number,
    category:String,
    location:String,
    date:{
     type:Date,
     default:Date.now()
    },
    status:String,
    Rating:Number,
    phone:Number,
    rating:{
        type:Number,
        min:0,
        max:5
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

listingSchema.post("findOneAndDelete",async(data,next)=>{
    let arr=data.reviews;
  let res= await Review.deleteMany({_id:{$in:arr}});
   next();
})

const Listing=new mongoose.model("Listing",listingSchema);

module.exports=Listing;