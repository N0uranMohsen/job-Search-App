import { Router } from "express";
import { deleteAccount, forgetPassword, getAnotherUserData, getUserData, signin, signup, updateAccount,updatePassword,verifymail, verifyOtp } from "./user.controller.js";
import { checkMail } from "../../middleware/checkMail.js";
import { validate } from "../../middleware/validate.js";
import { passwordVal, signinVal, signupVAl } from "./user.Validate.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const userRouter = Router()
userRouter.route('/signup').post( validate(signupVAl), checkMail,signup)
userRouter.route('/verify').post(verifyOtp)
userRouter.route('/signin').post(validate(signinVal),signin)
userRouter.route('').put(verifyToken,updateAccount).delete(verifyToken,deleteAccount).get(verifyToken,getUserData)
userRouter.route('/:id').get(verifyToken,getAnotherUserData)
userRouter.route('/updatePassowrd').put(verifyToken,updatePassword)
userRouter.route('/forgetPassword').get(forgetPassword)
// userRouter.route('/verifyOtp').get(verifyOtp)
userRouter.route('/verify/:token').get(verifymail)
export default userRouter