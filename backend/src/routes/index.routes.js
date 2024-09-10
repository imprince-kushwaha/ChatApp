import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js";
import { checkEmail } from "../controllers/validateEmail.controller.js";
import { checkPassword } from "../controllers/checkPassword.controller.js";

const router = Router()
// creating user api route
router.post('/register',registerUser)
// check user email
router.post('/email',checkEmail)
// check user password
router.post('/password',checkPassword)

export default router