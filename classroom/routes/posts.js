const express = require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Hi I am post!");
})
router.get("/:id",(req,res)=>{
    res.send("Hi I am post Id!");
})
router.post("/",(req,res)=>{
    res.send("Hi I am posting post!");
})
router.delete("/:id",(req,res)=>{
    res.send("Hi I am deleting post!");
})
module.exports=router;