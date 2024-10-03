import Joi from 'joi'
 



export const jobVal = Joi.object({
    jobTitle:Joi.string().max(80).required(),
    jobLocation:Joi.string().required(),
    workingTime:Joi.string().required(),
    seniorityLevel:Joi.string().required(),
    technicalSkills:Joi.array().required(),
    softSkills:Joi.array().required(),
  //  addedBy:Joi.string().required()
})