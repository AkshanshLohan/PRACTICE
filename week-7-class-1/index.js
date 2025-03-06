const bcrypt=require("bcrypt");
const express=require("express")
const app=express();
app.use(express.json());
const jwt=require("jsonwebtoken");
const JWT_SECRET="AKSHANSH123";
const mongoose=require("mongoose");
const{UserModel,todoModel}=require("./db")
mongoose.connect("mongodb+srv://akshanshlohan:<db_password>@akshansh.r0zqn.mongodb.net/todo-akshansh")
const {z}=require("zod")



app.post("/signup",async function(req,res){

    //input validation
    const requiredBody=z.object({
        email : z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        name: z.string().min(3).max(30)
    })

    const parsedDataWithSuccess=requiredBody.safeParse(req.body);
    //1. how to show user the exact error

    if(!parsedDataWithSuccess.success){
        res.json({
            message:"incorrect format"
        })
        return
    }
     const email=req.body.email;
     const password=req.body.password;
     const name=req.body.name;
     
     let errorthrown=false;
    try{
        errorthrown=true;
        const hashedpassword=await bcrypt.hash(password,5);
        console.log(hashedpassword)
   
       await UserModel.create({
           email :email,
           password: hashedpassword,
           name: name
        })
        throw new Error("user already exists")
    } 
    catch(e){
        res.json({
            message:"user already exists"
        })
    }
    if(!errorthrown){
     res.json({
        message: "you are logged in"
     })
    }
})
app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

     const response=await UserModel.findOne({
           email: email,
        })
        if(!response){
            res.status(403).json({
                message:"user does not exist in our database"
            })
            return
        }
        const passwordMatch=await bcrypt.compare(password,response.password);

        if(passwordMatch){
            const token=jwt.sign({
                id: response._id.toString()
            },JWT_SECRET);
            res.json({
               token: token
            })
        }
        else{
            res.status(403).json({
                message: "wrong ceredentials"
            })
        }
})
app.post("/todo",auth,async function(req,res){
     const userid=req.userid;
     const title=req.body.title;

     const todos=await todoModel.create({
            title,
            userid
     })

     res.json({
        userid: userid
     })
})
app.get("/todos",auth,async function(req,res){
    const userid=req.userid;
    const todos=await todoModel.find({
        userid:userid
    })

    res.json({
       todos
    })
})
function auth(req,res,next){
    const token=req.headers.token;
    const decodedData=jwt.verify(token, JWT_SECRET);

    if(decodedData){
        req.userid=decodedData.id;
        next();
    }
    else{
        res.status(403).json({
            message: "incorrect ceredntials"
        })
    }
}
app.listen(3000);
