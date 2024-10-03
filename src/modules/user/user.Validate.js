import Joi from 'joi'

export const signupVAl =Joi.object({
    firstName:Joi.string().min(3).max(10).required(),
    lastName:Joi.string().min(3).max(10).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Zs-z0-9]{8,15}/).required(),
    recoveryEmail:Joi.string().email().required(),
    DOB:Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    mobileNumber:Joi.string().pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/).required(),
    role:Joi.string().required(),
    status:Joi.string()


})


export const signinVal=Joi.object({
   
    email:Joi.string().email(),
    mobileNumber:Joi.string().pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/),
    password:Joi.string().pattern(/^[A-Z][A-Zs-z0-9]{8,15}/).required()
   
})
export const passwordVal=Joi.object({
    password:Joi.string().pattern(/^[A-Z][A-Zs-z0-9]{8,15}/).required()
})