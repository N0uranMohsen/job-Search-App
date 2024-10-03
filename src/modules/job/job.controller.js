import { Application } from "../../../DB/models/application.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Job } from "../../../DB/models/job.model.js";
import { User } from "../../../DB/models/user.model.js";
import { AppError } from "../../appError.js";
import { singleFile } from "../../fileUpload/fileUpload.js";
import { catchError } from "../../middleware/catchError.js";




//add Job



export const addJob =catchError(async(req,res,next)=>{
    if(req.user.role!=='company-HR')
        return next(new AppError('You must be a HR',404))
    const job= await Job.create(req.body)
    job.addedBy=req.user._id;
    job.save()

    res.status(201).json({messsage:'sucess',job})
})


//Update Job

export const updateJob =catchError(async(req,res,next)=>{
    if(req.user.role!=='company_HR')
      return  next(new AppError('You must be a HR',404))
    const job= await Job.findByIdAndUpdate(req.params.id)
   
if(!job)
   return next(new AppError('this job id not found ...',404))
    res.staus(201).json({messsage:'sucess',job})
})


//Delete Job

export const deleteJob =catchError(async(req,res,next)=>{
    if(req.user.role!=='company-HR')
      return  next(new AppError('You must be a HR',404))
    const job= await Job.findByIdAndDelete(req.params.id)
   
if(!job)
   return next(new AppError('this job id not found ...',404))
    res.status(201).json({messsage:'sucess',job})
})



//Get all Jobs with their company’s information

export const getAllJobsWithCompanyInfo =catchError(async(req,res,next)=>{
    // if(!req.user.role!=='Company_HR'&& !req.user.role!=='USER')
    //   return  next(new AppError('THIS user not found',404))

    const job= await Job.find().populate('addedBy')
   
if(!job)
   return next(new AppError('no jobs found ...',404))


    res.status(201).json({messsage:'sucess',job})


})


//Get all Jobs for a specific company

export const getAllCompanyJobs = catchError ( async(req,res,next)=>{
    // if(req.user.role!=='Company_HR'||req.user.role!=='USER')
    //   return  next(new AppError('THIS user not found',404))
       const company = await Company.find({companyName: req.params.name})
    const job= await Job.findById(company._id).populate(' addedBy')
   
if(!job)
   return next(new AppError('no jobs found ...',404))
    res.staus(201).json({messsage:'sucess',job})


})

//Get all Jobs that match the following filters 



export const fillterJobs = catchError(async(req,res,next)=>{
  
    // const {
    //     workingTime,
    //     jobLocation,
    //     seniorityLevel,
    //     jobTitle,
    //     technicalSkills
    // } = req.body;

   
//     const jobs = await Job.find({$and:[workingTime,jobLocation,seniorityLevel,jobTitle,technicalSkills]});
//      if(!jobs)
//        return next(new AppError('no jobs found'))
// if(jobs)
//     console.log(jobs);
//     res.json({message:'sucess',jobs})
const {
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.body;

  const filter = {};

  if (workingTime) {
    filter.workingTime = workingTime;
  }

  if (jobLocation) {
    filter.jobLocation = jobLocation;
  }

  if (seniorityLevel) {
    filter.seniorityLevel = seniorityLevel;
  }

  if (jobTitle) {
    filter.jobTitle = jobTitle;
  }

  if (technicalSkills) {
    filter.technicalSkills = technicalSkills;
  }

  const jobs = await Job.find(filter);
  if (!jobs || jobs.length === 0) {
    return next(new AppError('No jobs found', 404));
  }
res.json({message:'sucess',jobs})

         
 })



//Apply to Job
export const applyJob = catchError(async(req,res,next)=>{

    if(req.user.role !== 'user' )
        return  next(new AppError('THIS user not found',404))
   // await singleFile('resume') 
    req.body.userResume = req.file.filename
    req.body.userid = req.user._id
    req.body.jobid = req.params.jobid
        

   const app = await Application.create(req.body)
    //  app.userid = req.user._id
    // app.jobid=req.params.jobid
    //  await app.save()
    res.json({message:'sucess',app})
})



// await Job.find({$and:[workingTime,jobLocation,seniorityLevel,jobTitle,technicalSkills]})