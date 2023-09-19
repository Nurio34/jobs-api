
const JobsSchema = require("../models/Job")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require("../errors")
const jwt = require("jsonwebtoken")

const getAllJobs = async(req,res)=>{

    try {
        
        const {userId,name} = req.user

        const user = await JobsSchema.find({userId})

            res.status(StatusCodes.OK).json(user)
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Get All Job")
    }
}

const createJob = async(req,res)=>{

    
    const {userId,name} = req.user
    const {job} = req.body
    const data = {userId,name,job} 

        await JobsSchema.create(data)
}

const getJob = async(req,res)=>{

    try {
        res.status(StatusCodes.OK).json({msg:"all is well, Get Job"})
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Get Job")
    }
}

const updateJob = async(req,res)=>{

    try {
        res.status(StatusCodes.OK).json({msg:"all is well, Update Job"})
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Update Job")
    }
}

const deleteJob = async(req,res)=>{

    try {
        res.status(StatusCodes.OK).json({msg:"all is well, Delete Job"})
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Delete Job")
    }
}

module.exports = {getAllJobs,createJob,getJob,updateJob,deleteJob}