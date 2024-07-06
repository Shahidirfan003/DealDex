const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema}=require('./Schema');


module.exports.listingValidate=(req,res,next)=>{
    let result= listingSchema.validate(req.body);
    if(result.error){
     next(new ExpressError(400,result.error.details[0].message));
    }else{
     next();
    }
 }
 
 
module.exports.reviewValidate=(req,res,next)=>{
     let result= reviewSchema.validate(req.body);
     if(result.error){
      next(new ExpressError(400,result.error.details[0].message));
     }else{
      next();
     }
  }
 
module.exports.isLoggedIn=(req,res,next)=>{
     if(req.isAuthenticated()){
         next();
     }
     else{
         req.flash("error","You Must be Logged In!");
         req.session.originalUrl=req.originalUrl;
         res.redirect("/login");
     }
  }
 
module.exports.saveRedirectUrl=(req,res,next)=>{
     if(req.session.originalUrl){
         res.locals.originalUrl=req.session.originalUrl;
     }
     next();
  }
 module.exports.isListingOwner=async(req,res,next)=>{
     let {id}=req.params;
     let listing=await Listing.findById(id);
      if(listing.owner.equals(req.user._id)){
          next();
      }
      else{
         req.flash("error","Your Don't Have Access!");
         res.redirect(`/listings/${id}`);
      }
  }
 
  
module.exports.isReviewOwner=async(req,res,next)=>{
     let {id,reviewId}=req.params;
     let review=await Review.findById(reviewId);
      if(review.owner.equals(req.user._id)){
          next();
      }
      else{
         req.flash("error","Your Don't Have Access!");
         res.redirect(`/listings/${id}`);
      }
  }