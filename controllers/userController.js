const User=require("../models/user");
const Listing=require("../models/listing");
const { deleteImage } = require("../utils/reviewFunction");



module.exports.signupForm=(req,res)=>{
    res.render("listings/signup.ejs");
}

module.exports.loginForm=(req,res)=>{
    res.render("listings/login.ejs");
}

module.exports.signupData=async(req,res)=>{
    try{
        let {username,email,password,phone}=req.body;
        let newUser=await User.register(new User({username,email,phone}),password);
        req.login(newUser, function(err) {
            if (err) { return next(err); }
            req.flash("success","You have Succesfully SignedUp!");
            res.redirect('/listings');
         }
        )
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.loginData=(req,res)=>{
    req.flash("success","You Have Succesfully Logged In");
    let redirectUrl=res.locals.originalUrl || "/listings";
    res.redirect(`${redirectUrl}`);
  }

  module.exports.logoutData=(req,res)=>{

    req.logout((err)=>{
        if(err){
           return next(err);
        }
        else{
            req.flash("success","You Have Logged Out!");
            res.redirect("/listings");
        }
    })

}

module.exports.profile=async (req,res)=>{
    let {username}=req.params;
    let data=await User.findOne({username}).populate({path:'favourites',populate:{path:'owner'}})
     if(!data){
        req.flash("error","User does not exist!");
        return res.redirect('/listings');
     }
    let listings=await Listing.find({owner:data.id}).populate('owner');
  res.render('listings/profile.ejs',{data,listings});
}

module.exports.profileEdit=async(req,res)=>{
    if(req.user.username!==req.params.username){
        req.flash('error','You dont ghave access!')
        return res.redirect(`/${req.params.username}`)
    }
    let data= await User.findOneAndUpdate({username:req.params.username},req.body,{ runValidators: true });
    res.redirect(`/${req.params.username}`)
}

module.exports.profPicEdit=async(req,res)=>{
    if(req.user.username!==req.params.username){
        req.flash('error','You dont ghave access!')
        return res.redirect(`/${req.params.username}`)
    }
    let {path,filename}=req.file;
    let user=await User.findOne({username:req.params.username});
    if(user.profilePic.filename){
        let pubId=user.profilePic.filename;
        deleteImage(pubId);
    }
    user.profilePic={url:path,filename};
    user.save();
    res.redirect(`/${req.params.username}`)
}