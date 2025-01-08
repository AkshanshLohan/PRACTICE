const express=require('express')
const app=express;

app.length("/add/:a/:b",function(req,res){
    const a=parseInt(req.params.a);
    const b=parseInt(req.params.b);

    res.json({
        sum:a+b
    })

})
app.listen(3000);