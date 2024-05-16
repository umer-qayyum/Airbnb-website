const express = require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Hi I am user!");
})
router.get("/:id",(req,res)=>{
    res.send("Hi I am user Id!");
})
router.post("/",(req,res)=>{
    res.send("Hi I am posting user!");
})
router.delete("/:id",(req,res)=>{
    res.send("Hi I am deleting user!");
})
module.exports=router