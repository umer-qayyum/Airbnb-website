const Joi = require("joi");
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().allow("", null),
  }).required(),
});
const reviewSchema=Joi.object({
  reviews:Joi.object({
    rating:Joi.number().min(1).max(5).required(),
    comment:Joi.string().required(),
  }).required(),
})
module.exports={listingSchema, reviewSchema};