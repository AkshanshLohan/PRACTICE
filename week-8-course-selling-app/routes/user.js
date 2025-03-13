const { Router } =require("express");
const{ userModel, courseModel }=require("../db");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config")
const{ userMiddleware}=require("../middlewares/user")



   
    userRouter.post("/signup", async function(req,res){
      const { email,password,firstName,lastName }=req.body;
      //TODO: adding zod validation
      //TODO: hash the password so plaintext is not stored in db
      
      //TODO: put inside a try catch block
         await userModel.create({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
         })
        
      
  
        res.json({
             message: "signup succeded"
        })
    })
    userRouter.get("/signin",async function(req,res){
      const { email,password }=req.body;
      //TODO: ideally password should be hashed,and hence you cant compare the user provided password and the database password
      
        const user=await userModel.findOne({
          email:email,
          password:password
        })

        if(user){
            const token=jwt.sign({
              id: user._id
            } ,JWT_USER_PASSWORD);
            res.json({
              token: token
            })
        }
         else{
          res.json({
            message: "incorrect credentials"
          })
         }
    })
    
    userRouter.get("/purchases",userMiddleware,async function(req,res){
      const userId=req.userId;
      
      const purchases=await purchaseModel.find({
        userId: userId
      })

      const coursesData=await courseModel.find({
        _id:{$in :purchases.map(x=>x.courseId)}
      })
      res.json({
          purchases: purchases
      })
    })

module.exports={
     userRouter: userRouter
}
