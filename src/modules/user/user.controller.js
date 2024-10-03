
import { User } from "../../../DB/models/user.model.js"
import { sendEmail } from "../../email/email.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { catchError } from "../../middleware/catchError.js"
import userRouter from "./user.routes.js"
import { AppError } from "../../appError.js"
import { verifyToken } from "../../middleware/verifyToken.js"


//signup user 



export const signup = catchError( async(req,res)=>{
  req.body.username=req.body.firstName+" "+req.body. lastName
   const user= await User.create(req.body)

   user.password= undefined

   sendEmail(req.body.email)
   res.status(201).json({message:'sucess',user})

})

//Verify OTP

export const verifyOtp = catchError(async(req,res,next)=>{
    const find = await User.findOne({$and : [{email:req.body.email} ,{otp:req.body.otp}]})
    if(!find)
        return next (new AppError('invalid Otp or mail',404))
   // console.log(find.otpExp);
    if(new Date()> find.otpExp){
     //   console.log('exp');
        return next(new AppError('otp expired'))}
        find.confirmedMail = true;
        await find.save()

    res.json({message:'email verified successfully...'})

})


//signin 

//this Api cehck fisrt if the email is exist in Db then initat a token to the user if the password is correct 
export const signin =catchError(async(req,res,next)=>{

    const user =await User.findOne({$or:[{email:req.body.email},{mobileNumber:req.body.mobileNumber},{recoveryEmail:req.body.recoveryEmail}]})

    if(!user || ! bcrypt.compareSync(req.body.password,user.password))
        return next(new AppError ('email or password  not valid',401) )
    
    jwt.sign({_id:user._id , email:user.email,password:user.password,role:user.role,username:user.username},'Nouran',async(err,token)=>{
             user.satus='online'
             await user.save()
        res.json({message:'loged in sucessfully',token})

    })

})

//This API used to verify the email in signup ehen user click on the link that sent on mail
export const verifymail =(req,res)=>{

    jwt.verify(req.params.token,'Nouran',async (err,payload)=>{
            if(err)
                return res.json(err)
            await User.findOneAndUpdate({email:payload.email},{confirmedMail:true})
            res.json({message:'email confirmed successfully'})
    })
}

// export const verifyOtp =catchError(async(req,res,next)=>{
    
//     const time = new Date()
//     const user = await findOne({email:req.body.email})
//     if(!user)
//         return next(new AppError ('user not found',404))

//     if(user.otp === req.body.otp && user.ExpOtp >= time ){
//          user.confirmedMail=true;

//          user.save()
//     return res.json({message:'your account confirmed successsfuly...'})
// }
// else res.json({message:'otp expired..'})
    
// })



//update Account
export const updateAccount = catchError(async(req,res,next)=>{
  
        const {email,mobileNumber,recoveryEmail,DOB,lastName,firstName}=req.body
    
    if(email){
        const found= await User.findOne({$and :[{email},{_id:{$ne :req.user._id}}]})
        if(found)
            return next('This email is aleardy exists enter antothr one')
        
    }


    if(mobileNumber){
        const found= await User.findOne({$and :[{mobileNumber},{_id:{$ne :req.user._id}}]})
        if(found)
            return next('this Phone number is already exists ...')
    }
    if(recoveryEmail){
        const found= await User.findOne({$and :[{recoveryEmail},{_id:{$ne :req.user._id}}]})
        if(found)
            return next('this email is already exists ...')
    }


    const user = await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
      
    if(!user) return next(new AppError('This user Not Found',404))
        res.json({message:'updated',user})

   
})


//Delete usrAcouunt

export const deleteAccount = catchError(async(req,res,next)=>{
    const user = await User.findOne({_id :req.user._id})
    if(!user)
        return next(new AppError ('this account not found '))
    await User.findByIdAndDelete(user._id)
    res.json({message :'deleted successfully',user})


    
})

//get user account data
export const getUserData =catchError(async(req,res,next)=>{
    if(req.user.status==='offline')  return next(new AppError ('you must be log in'))
    const user = await User.findById(req.user._id)
    res.json({message:'sucess',user})
})



//Get profile data for another user 
export const getAnotherUserData =catchError(async(req,res)=>{

    const user = await User.findById(req.params.id)
    user.password=undefined
    
    res.json({message:'sucess',user})
})
//update PAssword
export const updatePassword  =  catchError(async(req,res)=>{
      const user = await User.findByIdAndUpdate(req.user._id,req.body.password)
      if(!user) return next(new AppError('user not found',404))
        res.json({message:'password updated'})
})


//forget password
export const forgetPassword = catchError(async(req,res)=>{
   
        const user = await User.findOne({email :req.body.email})
        if(!user)
            return next(new AppError('this email is not exists',404))
    user.confirmedMail=false
    user.password =req.body.password
    sendEmail(req.body.email)
})


///Get all accounts associated to a specific recovery Email 

export const AllAssciatedAccounts = catchError(async(req,res)=>{
    const {recoveryEmail }=req.body
    const account = await User.find(recoveryEmail);
    if(!account)
        return next( new AppError ('accounts not found',404))
    res.json({message:'sucess',account})
})








