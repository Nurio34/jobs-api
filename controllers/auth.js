
const UserSchema = require("../models/User")
const {StatusCodes} = require("http-status-codes")

const register = async(req,res) => {
    
    try {
        const user = await UserSchema.create({...req.body})
        res.status(StatusCodes.CREATED).json({user})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({errMSg:error.message.split(":")[2]})
    }
}


const login = async(req,res) => {
    
    try {
        
    } catch (error) {
        res.send(StatusCodes.BAD_REQUEST).json({errMSg:error})

    }
}

module.exports = {register,login}