const express=require('express');

const app=express();

 let users=[{name:"elon musk",
    kidneys:[{healthy: false
    },{
        healthy:true
    }]
 }];

 app.get("/",function(req,res){
    const elonkidneys=users[0].kidneys;
    console.log(elonkidneys);
    const numberOfKidneys=kidneys.length;
    let numberOfHealthykidneys=0;

    for(let i=0;i<elonkidneys.length;i++){
        if(elonkidneys[i].healthy){
            numberOfHealthykidneys++;
        }
    }
    const numberOfUnhealthykidneys=numberOfKidneys-numberOfHealthykidneys;
     
    res.json({
        numberOfKidneys,
        numberOfHealthykidneys,
        numberOfUnhealthykidneys
    })

 })

 app.use(express.json()) //body se data bhejne k liye

 //use postman to send put and post requests in json format

 app.post("/",function(req,res){
    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({
        healthy :isHealthy
    })
    res.json({
        msg :"done"
    })
 })

 app.put("/",function(req,res){
    for(let i=0;users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
 })

 app.delete("/",function(req,res){
    const newKidneys=[];
    for(let i=0;users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys=newKidneys
    res.json({msg : "done"});
 })















app.listen(3000);