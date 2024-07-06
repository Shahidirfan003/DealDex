const Listing = require("../models/listing");
const User = require("../models/user");

const { Classify, deleteImage } = require("../utils/reviewFunction");

module.exports.Home = async (req, res) => {
  let data = await Listing.find({}).populate("owner");
  res.render("listings/home.ejs", { data });
};

module.exports.sellForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.ViewListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate("owner")
    .populate({ path: "reviews", populate: { path: "owner" } });

  if (!listing) {
    req.flash("error", "The Listing you are looking for doesn't exist!");
    return res.redirect("/listings");
  }
  let categoryVal = listing.category;
  let data = await Listing.find({ category: categoryVal }).populate("owner");
  let reviewRatings = Classify(listing.reviews);
  res.render("listings/view.ejs", { listing, reviewRatings, data });
};

module.exports.EditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "The Listing you are looking for doesn't exist!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.AddListing = async (req, res, next) => {
  if (!req.file) {
    throw new ExpressError(400, "Image is Required");
  }
  let { path, filename } = req.file;
  let data = req.body;
  data.image = { url: path, filename };
  data.owner = req.user._id;
  data.rating = 0;
  let newListing = new Listing(data);
  await newListing.save();
  req.flash("success", "Your Listing is Added Successfully!");
  res.redirect("/listings");
};

module.exports.EditListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body });
  if (req.file) {
    let pubId = listing.image.filename;
    let { path, filename } = req.file;
    listing.image = { url: path, filename };
    await deleteImage(pubId);
    await listing.save();
  }
  req.flash("success", "Your Listing is Edited Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  let pubId = listing.image.filename;
  await deleteImage(pubId);
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Your Listing is Deleted Successfully!");
  res.redirect("/listings");
};
module.exports.favListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const user = await User.findById(req.user._id);
  if (!listing) {
    req.flash("error", "The Listing you are looking for doesn't exist!");
    return res.redirect("/listings");
  }
  if (!listing.favourites.includes(req.user.id)) {
    listing.favourites.push(req.user._id);
    user.favourites.push(id);
    await listing.save();
    await user.save();
  } else {
    let arr = listing.favourites.filter(
      (el) => el.toString() !== user._id.toString()
    );
    let arr2 = user.favourites.filter(
      (el) => el.toString() !== listing.id.toString()
    );
    listing.favourites = arr;
    user.favourites = arr2;
    await listing.save();
    await user.save();
  }
  res.redirect("/listings");
};

module.exports.SearchListing = async (req, res) => {
  let { category: categoryVal, location: city } = req.query;

  if (!categoryVal && !city) {
    req.flash("error", "Search Query is Required");
    return res.redirect("/listings");
  }
  let query = {};
  if (categoryVal) {
    query.category = { $regex: categoryVal, $options: "i" };
  }
  if (city) {
    query.location = { $regex: city, $options: "i" }; 
  }
  let data = await Listing.find(query).populate('owner');
  
  if (!data.length) {
    req.flash("error", "No Items Found!");
    return res.redirect("/listings");
  }
  res.render("listings/home.ejs", { data });
};
