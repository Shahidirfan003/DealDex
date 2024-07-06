const express=require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isReviewOwner,reviewValidate}=require('../middleware');
let {reviewAdd,reviewDelete}=require('../controllers/reviewController');




router.post("/",isLoggedIn,reviewValidate,wrapAsync(reviewAdd));
router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapAsync(reviewDelete));

  module.exports=router;