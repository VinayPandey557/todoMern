const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://vinaypandey46158:pandey557@cluster0.vceuh.mongodb.net/todo")

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
     },
     password: String,
     firstName: String,
     lastName: String
})

const TodoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User"},
    title: String,
    done: Boolean
})


const User = mongoose.model("User", UserSchema);

const Todo = mongoose.model("Todo", TodoSchema);


module.exports = {
     User, 
     Todo
}


