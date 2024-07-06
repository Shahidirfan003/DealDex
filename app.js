if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const { urlencoded } = require("body-parser");
const express=require("express");
const app=express();
const path=require("path");
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const User=require("./models/user");
const ExpressError=require("./utils/ExpressError");
let methodOverride = require('method-override');
let session = require('express-session');
const MongoStore = require('connect-mongo');
let flash = require('connect-flash');
let passport=require("passport");
let LocalStrategy=require("passport-local");
const listingRoute=require("./routes/listingRoute");
const reviewRoute=require("./routes/reviewRoute");
const userRoute=require('./routes/userRoute');


app.use(methodOverride('_method'));
app.use(urlencoded({extended:true}));
app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.static(path.join(__dirname,"public/assets")));

const dbUrl=process.env.MONGO_ATLAS;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
      secret: process.env.SECRET
    },
    touchAfter:24*3600
  });

store.on('error',()=>{
    console.log('Error in mongo session store',err);
})

 let sessionOptions={
    store:store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {  
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true }
  }

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



async function main() {
    await mongoose.connect(dbUrl);
}

main()
.then((res)=>{
    console.log("connected to database");
})
.catch(err => console.log(err));



app.get('/',(req,res)=>{
  res.redirect('/listings');
})


app.use('/listings',listingRoute);
app.use('/listings/:id/review',reviewRoute);
app.use('/',userRoute);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="SOME ERROR OCCURED!"}=err;
    res.status(status).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})


