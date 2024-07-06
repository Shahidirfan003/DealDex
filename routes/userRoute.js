const express=require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl}=require('../middleware');
let passport=require("passport");
let {signupForm,loginForm,signupData,loginData,logoutData,profile, profileEdit, profPicEdit}=require('../controllers/userController');
const {isLoggedIn}=require('../middleware');
const multer  = require('multer');
const {storage,cloudinary}=require("../cloudinary");
const upload = multer({  storage });




router.get("/signup",signupForm);
router.get("/login",loginForm);
router.post("/signup",wrapAsync(signupData));
router.post('/login',saveRedirectUrl, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),loginData);
router.get("/logout",logoutData);
router.get('/:username',isLoggedIn,wrapAsync(profile));
router.post('/:username',isLoggedIn,wrapAsync(profileEdit));
router.put('/:username',isLoggedIn,upload.single('profilePic'),wrapAsync(profPicEdit));

module.exports=router;