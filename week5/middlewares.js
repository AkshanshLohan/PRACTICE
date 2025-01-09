//create a middleware function that logs each incoming requests HTTP method,URL and timestamp to the console
const express=require('express');
const app=express();

function middleware(req,res,next){
    console.log("Method is" + req.method);
    console.log("Method is" + req.url);
    console.log(new Date());
    next();

}

app.use(middleware);

app.get("/add",function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        sum :a + b
    })
    
})
app.listen(3000)