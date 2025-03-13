const { Router }=require("express");
const adminRouter=Router();
const {adminModel, courseModel}=require("../db");
const jwt=require("jsonwebtoken");
const {adminMiddleware}=require("../middlewares/admin")
const {z}=require("zod");

adminRouter.post("/signup",async function(req,res){
    const { email,password,firstName,lastName }=req.body;
      //TODO: adding zod validation
      const requiredBody=z.object({
        email: z.email().max(10).min(3),
        password: z.string().max(10).min(3),
        firstName: z.string(),
        lastName:z.string()
      })
      const parsedData=requiredBody.safeParse(req.body);
      if(!parsedData.success){
        res.json({
            msg:"incorrect format"
        })
        return
      }
      //TODO: hash the password so plaintext is not stored in db

      try {
        const existingUser = await adminModel.findOne({ email: email });
    
        if (existingUser){
            return res.json({ message: "User already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword); 
    
        await adminModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
    
        res.json({ message: "You are registered and logged in" });
    
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "An error occurred, please try again later." });
    }
    

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
