const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/reviews");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const asyncWrap=require('./utils/WrapAsync');
const ExpressError=require('./utils/ExpressError.js');
const listingSchema=require('./schema.js');
const reviewSchema=require('./schema.js');
const listingRouter=require('./routes/listings.js')
const reviewRouter=require('./routes/reviews.js');
// const WrapAsync = require("./utils/WrapAsync");
const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

connectdb()
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(`error from connection ${err}`);
  });
async function connectdb() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.get("/", (req, res) => {
  res.send("Hi I am root ");
});




app.use('/listings',listingRouter)
app.use('/listings/:id/reviews',reviewRouter);
// app.get("/test",async(req,res)=>{
//     let newListing = new Listing({
//         title:"Ambani's Villa",
//         description:"Villa has 21 floors",
//         price:300,
//         location:"Mumbai",
//         country:"India"
//     });
//     await newListing.save();
//     console.log("new data save : ",newListing );
//     res.send("data saved successfully");
// })
app.all("*",(req,res,next)=>{
    next(new ExpressError(400,"Page not found!"));
})
app.use((err,req,res,next)=>{
    let {status=500,message="Somthing is Wrong"}=err;
    res.status(status).render("error.ejs",{err});
})
const PORT = 8080;
app.listen(PORT, (req, res) => {
  console.log(`server is running at ${PORT}`);
});
