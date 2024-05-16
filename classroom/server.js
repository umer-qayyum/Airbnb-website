const express = require("express");
const app = express();
const users=require('./routes/users');
const posts=require('./routes/posts');
const cookieParser=require('cookie-parser');
app.use(cookieParser('secretcode'));
app.get("/",(req,res)=>{
    res.send("Hi I am root!");
})

app.get('/getcookies',(req,res)=>{
    res.cookie("name","umer bhai", {signed:true});
    res.send("we send signed cookie")
})
app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
})
// app.get('/greetings',(req,res)=>{
// let{greet}=req.cookies;
// res.send(`${greet}`);
// })
// app.get('/greetings',(req,res)=>{
//     console.dir(req.cookies);
//     res.send('got cookies');
// })
app.use('/users',users);
app.use('/posts',posts);

app.listen(3000,()=>{
    console.log("server is listening");
})