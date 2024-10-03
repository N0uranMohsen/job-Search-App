import mongoose, { Schema } from "mongoose";


const userSchema = new Schema ({

    firstName :{
        type:String,
        required :true
    },
    lastName:{
        type:String,
        required :true
    },

    username:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    recoveryEmail:{
        type:String,
        required:true
    },
    confirmedMail:{
        type:Boolean,
        default:false
    },
   DOB: {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Please fill a valid date of birth (YYYY-MM-DD)']
  },
  mobileNumber:{
    type:String,
    required:true,
    unique:true
  },
  role:{
    type:String,
    enum:['user','company-HR'],
    default:"user"
  },
  otp:String,
  otpExp:Date,
  satus:{
    type:String,
    enum:['online','offline'],
    default:'offline'
  }




})
export const User= mongoose.model('User',userSchema)