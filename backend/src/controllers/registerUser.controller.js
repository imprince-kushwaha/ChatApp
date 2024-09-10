import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profile_pic } = req.body

        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Already user exists",
                error: true,
            })
        }

        // hashing the password
        const hashpassword = await bcrypt.hash(password, 10)
        const payload = {
            name,
            email,
            profile_pic,
            password: hashpassword
        }
        const user = new User(payload)
        const userSave = await user.save()
        return res.status(201).json({
            message: "User created successfully",
            data: userSave,
            success: true

        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export { registerUser }