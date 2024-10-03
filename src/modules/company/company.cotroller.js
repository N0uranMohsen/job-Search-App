import { Application } from "../../../DB/models/application.model.js";
import { Company } from "../../../DB/models/company.model.js";
import { Job } from "../../../DB/models/job.model.js";
import { AppError } from "../../appError.js";
import { catchError } from "../../middleware/catchError.js";


//add Company
export const addCompany = catchError(async(req,res,next)=>{
  if(req.user.role!=='company-HR')
    return next(new AppError('you should be HR to add Company'))
    
  const company = await Company.create(req.body)
  company.companyHR = req.user._id;
  await company.save()
  res.status(201).json({message:'sucess',company})

})


//Update company data
/*  first check if the user is hr to allow him making updates
then search for the company if found -->update
                            else ---> return message
*/


export const updateCompany = catchError(async(req,res,next)=>{

    if(req.user.role!=='company-HR')
        return next(new AppError('you should be HR to update Company'))
    const company = await Company.findByIdAndUpdate(req.params.id,req.body)
    if(!company)
        return next (new AppError('this company not found',404))
    res.json({message:'suces',company})
})

//delete company 
export const deleteCompany = catchError(async(req,res,next)=>{

    if(req.user.role!=='company-HR')
        return next(new AppError('you should be HR to delete Company'))
    const company = await Company.findByIdAndDelete(req.body.id,req.body)
    if(!company)
        return next (new AppError('this company not found',404))
    res.json({message:'suces',company})
})

//get company data 

export const getCompantData =catchError(async(req,res,next)=>{
    if(req.user.role!=='company-HR')
        return next(new AppError('you should be HR to get  Companys data'))
        const compnay =await Company.findById(req.params.id)


    if(!compnay)
    return next(new AppError('this compnay not found',404))

    const find = await Job.findById(req.params.id).populate('addedBy')

    res.json({message:'sucess',find})

    
})


//Search for a company with a name. 


export const getCompanyByNAme =catchError(async(req,res,next)=>{
    const company =await Company.findOne({ companyName:req.params.name})
    if(!company)
        next(new AppError('this compnay not found',404))

    
    res.json({message:'sucess',company})

 })


//Get all applications for specific Job

export const getAllApplications =catchError(async(req,res,next)=>{
    if(req.user.role!=='company-HR')
        return next(new AppError('you should be HR to get  Companys data'))

    const job = await Job.findById(req.params.id)

 if (!job) {
        return next(new AppError( 'Job not found') ,404);
    }
    const applications = await Application.find({ jobid: req.params.id ,userid : req.user._id}).populate('jobid','userid');

    if(!applications)
        return next(new AppError ('there is no applications for this job',404))

    res.json({ message: 'success', applications });
})




