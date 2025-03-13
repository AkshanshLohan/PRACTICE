const { Router }=require("express")
const courseRouter=Router();
const {courseModel}=require("../db")
    courseRouter.post("/purchase",function(req,res){
        //you would expect the user to pay you money
        res.json({
            message:"signin endpoint"
        })
    })
    courseRouter.get("/preview",function(req,res){
        res.json({
            message:"current courses"
        })
        
    })
    module.exports={
        courseRouter: courseRouter
    }
       
    
    
