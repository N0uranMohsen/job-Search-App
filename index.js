//handle programmin errors
// process.on('uncaughtException',()=>{
//     console.log('error in code')
// })
import express from 'express'
import dbConn from './DB/dbConn.js'
import userRouter from './src/modules/user/user.routes.js'
import { AppError } from './src/appError.js'
import { globalErrorHandling } from './src/middleware/globalErrorHandling.js'
import jobRouter from './src/modules/job/job.routes.js'
import companyRouter from './src/modules/company/company.routes.js'
const app = express()
const port = 3000

app.use(express.json())
app.use('/users',userRouter)
app.use('/jobs',jobRouter)
app.use('/company',companyRouter)

 //handle unhandled routes
 app.use('*',(req,res,next)=>{
    next(new AppError (`route not found ${req.originalUrl}`, 404))
    
})
app.use(globalErrorHandling)
process.on('unhandledRejection',(err)=>
{
    console.log('error..',err)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))