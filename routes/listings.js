const express=require("express");
const router=express.Router();
const asyncWrap=require('../utils/WrapAsync');
const {listingSchema}=require('../schema.js');
const ExpressError=require('../utils/ExpressError.js');
const Listing = require("../models/listing");
const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.message);
    }
    next();
}
//index route
router.get("/", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
  });
  // new route
  router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  //show route
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    res.render("listings/show.ejs", { listing });
  });
  //create route
  router.post("/",asyncWrap( async (req, res, next) => {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      res.redirect("/listings");
  }));
  //edit route
  router.get("/:id/edit",asyncWrap( async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }));
  //update route
  router.put("/:id",asyncWrap( async (req, res) => {
      // if (!req.boy.listing){
      //     throw new ExpressError(400,"Send valid data for listing");
      //   }
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));
  //delete route
  router.delete("/:id",asyncWrap( async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id, { ...req.body.listing });
    res.redirect("/listings");
  }));
  module.exports=router;