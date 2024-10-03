import mongoose, { Schema, Types } from "mongoose";




const applicationSchema = new Schema({

    jobid:{
        type:Types.ObjectId,
        ref:'Job'
    },
    userid:{
        type:Types.ObjectId,
        ref:'User'
    },
    userSoftSkills:[String]  ,
    userTechSkills:[String],
    
    userResume:{
        type:String,
        required:true
    }


})
applicationSchema.post('init',function (val){
    val.imgUrl ="http://localhost:3000/uploads/"+val.userResume

})



export const Application=mongoose.model('Application',applicationSchema)