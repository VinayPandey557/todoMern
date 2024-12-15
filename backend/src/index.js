const express = require("express");
const cors = require("cors");
const zod = require("zod");
const { User, Todo } = require("./db")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./secret");



const app = express();
app.use(express.json());
app.use(cors());


const signUpBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

app.post("/signup", async (req, res) => {
    const { success } = signUpBody.safeParse(req.body);
    if(!success){
        res.status(411)
        return res.json({
            message: "Invalid input"
        })
    };
   await User.create({
    username: req.body.username,
    password: req.body.password
   })
   res.json({
    message: "You are signed up"
   })
});

const signinBody= zod.object({
    username: zod.string(),
    password: zod.string()
})
app.post("/signin",async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success){
        res.status(411);
        return res.json({
            message: "Invalid input"
        })
    };

    const response = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
   if(response){
    const token = await jwt.sign({username: response.username}, JWT_SECRET, {expiresIn: "1h"})
    res.json({
        token
    })
   }
   return res.json({
    message: "You are logged in"
   })
});

const createTodo = zod.object({
    title: zod.string()
})
app.post("/todo",async (req, res) => {
    const createPayload = req.body;
    const { success } = createTodo.safeParse(createPayload);
    if(!success){
        res.status(411)
        return res.json({
            message: "you sent the wrong inputs"
        })
    }
  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    done: false
  })
  res.json({
    message: "Todo has been created"
  })
})

app.get("/todos", (req, res) => {
    res.json({
        todos: []
    })
})

const updateTodo = zod.object({
    title: zod.string()
})
app.put("/completed",async (req, res) => {
    const updatePayload = req.body;
    const { success } = updateTodo.safeParse(updatePayload);
    if(!success) {
        return res.status(411).json({
            message:"You have sent the wrong inputs" 
        })
    }
 await Todo.findByIdAndUpdate({
    _id: req.body.id, 
 }, {
    done: true
 })
 res.json({
    message: "Todo marked as completed"
 })
})






app.listen(3000, ()=> {
    console.log("server is running");
});

console.log("Server is running");