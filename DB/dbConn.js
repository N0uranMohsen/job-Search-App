import mongoose from "mongoose";

const dbConn = mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(()=>console.log('DB connected successfully...!'))
.catch((err)=>console.log(err))
export default dbConn