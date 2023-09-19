
const {BadRequestError,UnauthenticatedError} = require("../errors")
const jwt = require("jsonwebtoken")

const auth = async(req,res,next) => {

        const authHeader = req.headers.authorization

                if(!authHeader || !authHeader.startsWith("Bearer")) throw new UnauthenticatedError("Unauthenticated Request")

        const token = authHeader.split(" ")[1]

        const payload = jwt.verify(
                token,
                process.env.JWT_SECRET,
                {expiresIn : "30d"}
                )
    
        req.user = {userId:payload.userId,name:payload.name}
                next()
}

module.exports = auth