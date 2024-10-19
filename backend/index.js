const express = require("express");
const zod = require("zod");
const { User, Todo } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require('./secret');
const auth = require("./auth");
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors());


console.log(JWT_SECRET);

const signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
})
app.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        res.status(411);
        return res.json({
            message: "Invalid Input"
        })
    }
    await User.create({
        username: req.body.username,
        password: req.body.password,
    });
    res.json({
        message: "You are Signed up"
    })
})


const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});
app.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        res.status(411);
        res.json({
            message: "invalid input"
        })
    }
    const response = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(response){
        const token = jwt.sign({username: response.username} ,JWT_SECRET, {expiresIn: "1h"});
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
    
})

 

const createTodo = zod.object({
    title: zod.string().min(1, "Title is required"),
})
app.post("/todo",auth,async (req, res) => {
   const createPayload = req.body;
   const parsedPayload = createTodo.safeParse(createPayload);

   if(!parsedPayload.success){
      res.status(411).json({
        message: "you sent the wrong inputs",
      })
      return
   }
   await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    done: false
   })
   res.json({
    message: "Todo created"
   })
})



app.get("/todos", async (req, res) => {
  
    res.json({
        todos: []
    })
    
})

const updateTodo = zod.object({
    title: zod.string().min(1, "Title is required")
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            message: "You sent the wrong inputs"
        })
        return;
    }

    await Todo.findByIdAndUpdate({
        _id: req.body.id
    }, {
        done: true
    })
    res.json({
        message: "Todo marked as completed"
    })
})

app.listen(3000, () => {
   console.log("server is Running successfully");
})