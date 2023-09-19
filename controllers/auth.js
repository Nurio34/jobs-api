
const UserSchema = require("../models/User")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError} = require("../errors")

const register = async(req,res)=>{

    try {
        const user = await UserSchema.create(req.body)
        const token = user.createToken()

            res.status(StatusCodes.OK).json({name:user.name,token})
    } 
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({errMsg:error})
    }
}

const login = async(req,res)=>{

        const {email,password} = req.body

            if(!email) throw new BadRequestError("Must provide an email")
            if(!password) throw new BadRequestError("Must provide a password")

        const user = await UserSchema.findOne({email})

            if(!user) throw new BadRequestError("Invalid User")

        const isPasswordsMatched = await user.comparePasswords(password)

            if(!isPasswordsMatched) throw new BadRequestError("Invalid password")

        const token = user.createToken()
            console.log(token);

            res.status(StatusCodes.OK).json({name:user.name,token})

}



module.exports = {login,register}