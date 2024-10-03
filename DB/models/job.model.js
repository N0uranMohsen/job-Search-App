import mongoose, { Schema, Types } from "mongoose";




const jobSchema = new Schema({
    jobTitle:{
        type:String,
        required:true
    },
    jobLocation :{
        type:String,
       enum: [ 'onsite', 'remotely', 'hybrid' ]
    },
    
   workingTime :{
        type:String,
       enum: [ 'part-time', 'full-time' ]
    },
    seniorityLevel:{
    type:String,
    enum:['Junior', 'Mid-Level', 'Senior','Team-Lead', 'CTO']
    },
    jobDescription:String,

    technicalSkills :[String],
    softSkills :[String],

    addedBy:{
        type:Types.ObjectId,
        ref:'Company'
    }
})


export const  Job = mongoose.model('Job',jobSchema)