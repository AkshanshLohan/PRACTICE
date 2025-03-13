const { Router }=require("express");
const adminRouter=Router();
const {adminModel, courseModel}=require("../db");
const jwt=require("jsonwebtoken");
const {adminMiddleware}=require("../middlewares/admin")

adminRouter.post("/signup",async function(req,res){
    const { email,password,firstName,lastName }=req.body;
      //TODO: adding zod validation
      //TODO: hash the password so plaintext is not stored in db
      
      //TODO: put inside a try catch block
         await adminModel.create({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
         })
        
      
  
        res.json({
             message: "signup succeded"
        })
})
adminRouter.post("/signin",async function(req,res){
    const { email,password }=req.body;
          //TODO: ideally password should be hashed,and hence you cant compare the user provided password and the database password
          
            const admin=await adminModel.findOne({
              email:email,
              password:password
            })
    
            if(admin){
                const token=jwt.sign({
                  id: admin._id
                } ,process.env.JWT_ADMIN_PASSWORD);

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
adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId=req.adminId;
    const { title,description,imageUrl,price }=req.body;

    //creating a web3 saas in 6 hours(to learn how to directly upload image by making a pipeline)

    const course=await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        price: price,
        creatorId:adminId
    })

    res.json({
        message:"course created",
        courseId: course._id
    })
})
adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId=req.adminId;
    const {title,description,price,imageUrl,courseId}=req.body;

    await courseModel.updateOne(
        {
            _id:courseId,
            creatorId:adminId
        },
        {
            title: title,
            price: price,
            imageUrl:imageUrl,
            description: description
        }
    )

    res.json({
        message:"course updated",
        courseId: course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.adminId;
    const courses=await courseModel.find({
         creatorId:adminId
    })

    res.json({
        message:"done",
        courses: courses
    })
})

module.exports={
    adminRouter:adminRouter
}
