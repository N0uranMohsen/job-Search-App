

export const globalErrorHandling = (err,req,res,next)=>{

    const code = err.stausCode || 500

    res.status(code).json({error :"error",message:err.message}) 

}