
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Plese provide name"],
        minlength : [3,"Name must be greater than 2 characters"],
        maxlength: [12,"Name must be less than 13 characters"]
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email"
        ],
        unique : true,
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minlength:[8,"Password must be greater than 7 characters."]
    }
})

module.exports = mongoose.model("UserData",UserSchema)