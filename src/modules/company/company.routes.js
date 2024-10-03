import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addCompany, getAllApplications, getCompantData, getCompanyByNAme, updateCompany } from "./company.cotroller.js";
import { compantVal } from "./company.validate.js";
import { validate } from "../../middleware/validate.js";


const companyRouter =Router()

companyRouter.route('').post(verifyToken,validate(compantVal),addCompany)
companyRouter.route('/search/:name').get(getCompanyByNAme)
companyRouter.route('/application/:id').get(verifyToken,getAllApplications)
companyRouter.route('/:id').put(verifyToken,updateCompany).delete(verifyToken , updateCompany).get(verifyToken , getCompantData)
export default companyRouter


