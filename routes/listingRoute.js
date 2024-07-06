const express=require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isListingOwner,listingValidate}=require('../middleware');
const multer  = require('multer');
const {storage,cloudinary}=require("../cloudinary");
const upload = multer({  storage });
let {Home,sellForm,ViewListing,EditForm,AddListing, EditListing, deleteListing, favListing, SearchListing}=require('../controllers/listingController');


router.get("/",wrapAsync(Home));
router.get("/new",isLoggedIn,sellForm);
router.get("/search",wrapAsync(SearchListing));
router.get("/:id",wrapAsync(ViewListing));
router.get("/:id/edit",isLoggedIn,wrapAsync(EditForm));
router.put('/:id/fav',isLoggedIn,wrapAsync(favListing));
router.post("/",isLoggedIn,upload.single('image'),listingValidate,wrapAsync(AddListing));
router.patch("/:id",isLoggedIn,isListingOwner,upload.single('image'),listingValidate,wrapAsync(EditListing));
router.delete("/:id",isLoggedIn,isListingOwner,wrapAsync(deleteListing));

module.exports=router;

