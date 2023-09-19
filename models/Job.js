
const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:[true,"You are not authenticated to create a data"]
        },
        name:{
            type:String,
            required:[true,"Name could not be recognised"]
        },
        job:{
            type:String,
            required:[true,"Must be a job"]
        }
    }
)

module.exports = mongoose.model("jobData",JobSchema)