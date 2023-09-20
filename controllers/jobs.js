
const JobsSchema = require("../models/Job")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require("../errors")
const jwt = require("jsonwebtoken");
const Job = require("../models/Job");

const getAllJobs = async(req,res)=>{

    try {
        
        const {userId,name} = req.user

        const jobs = await JobsSchema.find({userId})

            res.status(StatusCodes.OK).json(jobs)
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Get All Job")
    }
}

const createJob = async(req,res)=>{

    
    const {userId,name} = req.user
    const {job} = req.body
    const data = {userId,name,job} 

        const jobs = await JobsSchema.create(data)
        res.status(StatusCodes.OK).json(jobs)

}

const getJob = async(req,res)=>{

    try {
        const{userId,name} = req.user
        const jobId = req.params.id

        const job = await JobsSchema.findOne({userId,_id:jobId})
        
            res.status(StatusCodes.OK).json(job)
                console.log(job);
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Get Job")
    }
}

const updateJob = async(req,res)=>{

    const {
        body : {job},
        user : {userId,name},
        params : { id: jobId}
    } = req

    try {
        
        const updatedJob = await JobsSchema.findOneAndUpdate({_id:jobId, userId:userId},{job:job},
            {new:true,
            runValidators:true})

            res.status(StatusCodes.PARTIAL_CONTENT).json({updatedJob})

    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Update Job")
    }
}

const deleteJob = async(req,res)=>{

    const {
        user : {userId,name},
        params:{id:jobId}
    } = req

    try {
        
        const deletedJob = await JobsSchema.findOneAndDelete({userId,_id:jobId}) 

        res.status(StatusCodes.OK).json(deletedJob)
    } catch (error) {
        throw new BadRequestError("all is well but Bad Req while Delete Job")
    }
}

module.exports = {getAllJobs,createJob,getJob,updateJob,deleteJob}