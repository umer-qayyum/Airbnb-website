const express=require("express");
const router=express.Router({mergeParams:true});
const asyncWrap=require('../utils/WrapAsync');
const {reviewSchema}=require('../schema.js');
const ExpressError=require('../utils/ExpressError.js');
const Listing = require("../models/listing");
const Review = require("../models/reviews");

const validateReviews=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
  }
router.post("/",validateReviews,asyncWrap(async(req,res)=>{
    const {id}=req.params;
    let listing=await Listing.findById(id);
    let newReview=new Review(req.body.reviews);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
  
    res.redirect(`/listings/${id}`)
  }))
  
  router.delete("/:reviewId",asyncWrap(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`)
  }))
  module.exports=router;