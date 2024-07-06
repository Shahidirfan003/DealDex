const Joi = require('joi');

const validCategories = [
  'cars',
  'flats',
  'electronics',
  'homes',
  'fashion',
  'services',
  'animals',
  'jobs',
  'mobiles',
  'bikes',
  'books',
  'laptops',
  'cameras'
];

const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    image:Joi.string().valid(''),
    category: Joi.string().valid(...validCategories).required(),
    location: Joi.string().required(),
    status: Joi.string().required(),
    phone: Joi.number().min(1000000000).max(9999999999).required() // minimum length of 10 digits
});

const reviewSchema=Joi.object({
  comment:Joi.string().required(),
  rating:Joi.number().required().min(1).max(5),  
})

module.exports.reviewSchema=reviewSchema;
module.exports.listingSchema = listingSchema;
