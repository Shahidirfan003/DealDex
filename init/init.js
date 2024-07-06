const mongoose = require('mongoose');
const Listing=require("../models/listing");
const data=require("./data");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/dealdex');
}

main()
.then((res)=>{
    console.log("connected to database");
})
.catch(err => console.log(err));


Listing.insertMany(data)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})
