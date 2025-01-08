const express=require('express')
const app=express;

app.get("/add/:a/:b",function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    res.json({
        sum:a+b
    })

})
app.get("/sub/:a/:b",function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    res.json({
        sub:a-b
    })

})
app.get("/div/:a/:b",function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    res.json({
        div:a/b
    })

})
app.get("/add/:a/:b",function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    res.json({
        mul:a*b
    })

})
app.listen(3000);