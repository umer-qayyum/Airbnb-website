const mongoose=require('mongoose');
const initData=require('./data');
const Listing=require('../models/listing');
const MONGO_URL='mongodb://127.0.0.1:27017/wander'
connectdb().then(()=>{
    console.log("connect to database");
}).catch((err)=>{
    console.log(`error from connection ${err}`);
})
async function connectdb(){
    await mongoose.connect(MONGO_URL);
}
const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
}
initDB();