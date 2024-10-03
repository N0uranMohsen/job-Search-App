 
import bcrypt from 'bcrypt'
import { User } from '../../DB/models/user.model.js'


 export const checkMail= async(req,res,next)=>{
    const isFound= await User.findOne({email:req.body.email})
    if(isFound)  return res.status(409).json({message:'this email is aleady exists'})
    req.body.password = bcrypt.hashSync(req.body.password,8) 
      next()
      
 }
 