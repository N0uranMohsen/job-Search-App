import { AppError } from "../appError.js"


export const validate =(schema)=>
{

    return (req,res,next)=>{
        let {error} = schema.validate(req.body,{abortEarly:false})
        if(!error)
        {
            next()
        }
        else{
            const arrMsg =  error.details.map( err => err.message);
         
                next(new AppError(arrMsg,401))
    } 
}} 