const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const Review=require('./reviews');
const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:Object,
        url:{
            default:"https://www.pexels.com/photo/palm-trees-at-night-258154/",
            set:(v)=>v===""?"https://www.pexels.com/photo/palm-trees-at-night-258154/":v,
        }
       
    },
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }]
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    console.log("Hello Post middleware");
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})
const model=new mongoose.model("Listing",listingSchema)
module.exports=model;