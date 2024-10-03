import Joi from 'joi'


export const compantVal = Joi.object({
    companyName:Joi.string().required(),
    description:Joi.string(),
    address:Joi.string(),
    companyEmail:Joi.string().email().required(),
    
})