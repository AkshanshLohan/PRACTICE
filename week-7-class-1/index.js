const express=require("express")
const app=express();
app.use(express.json());
const jwt=require("jsonwebtoken");
const JWT_SECRET="AKSHANSH123";
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://akshanshlohan:<db_password>@akshansh.r0zqn.mongodb.net/todo-akshansh")

const{UserModel,todoModel}=require("./db")

app.post("/signup",async function(req,res){
     const email=req.body.email;
     const password=req.body.password;
     const name=req.body.name;

    await UserModel.create({
        email :email,
        password: password,
        name: name
     })

     res.json({
        message: "you are logged in"
     })
})
app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

     const user=await UserModel.create({
           email: email,
           password: password,
           name:name
        })

        if(user){
            const token=jwt.sign({
                id: user._id.toString()
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
