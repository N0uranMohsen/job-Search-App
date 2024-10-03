import { Router } from "express";
import { addJob, applyJob, deleteJob, fillterJobs, getAllCompanyJobs, getAllJobsWithCompanyInfo, updateJob } from "./job.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { validate } from "../../middleware/validate.js";
import { jobVal } from "./job.validate.js";
import { fileUpload, singleFile } from "../../fileUpload/fileUpload.js";
import userRouter from "../user/user.routes.js";




const jobRouter= Router()

jobRouter.route('/').post(verifyToken,validate(jobVal),addJob)
jobRouter.route('/compInfo').get(verifyToken,getAllJobsWithCompanyInfo)
jobRouter.route('/:id').put(verifyToken,updateJob).delete(verifyToken,deleteJob)
userRouter.route('/compName/:name').get(verifyToken,getAllCompanyJobs)
jobRouter.route('/fillter').get(verifyToken,fillterJobs)
// jobRouter.route('/apply').post(singleFile('pdf'),applyJob)
jobRouter.route('/apply/:id').post(verifyToken,fileUpload({folder: "resumes"}).single('pdf'),applyJob)


export default jobRouter


