
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Must be a name"],
            minlength:[4,"Name must be greater than 3 characters"]
        },
        email:{
            type:String,
            match:[
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                "Must be an email"
            ],
            unique: true
        },
        password:{
            type:String,
            minlength:[8,"Password must be greater than 3 characters"]
        }
    }
)


UserSchema.pre("save", async function(){

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

UserSchema.methods.createToken = function(){
    
    const token = jwt.sign(
        {userId:this._id, name:this.name},
        process.env.JWT_SECRET,
        {expiresIn : `${process.env.JWT_LIFETIME}`}
    )
    return token
}

UserSchema.methods.comparePasswords = async function(reqPass){
    
    const isMatch = bcrypt.compare(reqPass,this.password)
    return isMatch
}

module.exports = mongoose.model("userData", UserSchema)