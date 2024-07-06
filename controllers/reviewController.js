const {ReviewAvg}=require('../utils/reviewFunction');
const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.reviewAdd=async(req,res)=>{
    let {id}=req.params;
    let review=new Review(req.body);
    review.owner=req.user._id;
    await review.save();
    await Listing.findByIdAndUpdate(id,{$push:{"reviews":review._id}},{new:true});
    
     let listing = await Listing.findById(id).populate('reviews');
     listing.rating=ReviewAvg(listing.reviews);
     await listing.save();

    req.flash("success","Your Review is Added Successfully!");
    res.redirect(`/listings/${id}`)
}

module.exports.reviewDelete=async(req,res)=>{
    let {id,reviewId}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{$pull:{"reviews":reviewId}},{new:true}).populate('reviews');
    listing.rating=ReviewAvg(listing.reviews);
     await listing.save();
    let review=await Review.findByIdAndDelete(reviewId);
    req.flash("success","Your Review is Deleted Successfully!");
    res.redirect(`/listings/${id}`)
  }