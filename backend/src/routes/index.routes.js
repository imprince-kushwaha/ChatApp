import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js";
import { checkEmail } from "../controllers/validateEmail.controller.js";
import { checkPassword } from "../controllers/checkPassword.controller.js";
import { userDetails } from "../controllers/userDetails.controller.js";
import { logout } from "../controllers/logout.controller.js";
import { updateUserDetails } from "../controllers/updateUserDeatils.controller.js";

const router = Router()
// creating user api route
router.post('/register',registerUser)
// check user email
router.post('/email',checkEmail)
// check user password
router.post('/password',checkPassword)
// login user details
router.get('/user-details',userDetails)
// logout user
router.get('/logout',logout)
// update user deatils
router.get('/update-user',updateUserDetails)

export default router