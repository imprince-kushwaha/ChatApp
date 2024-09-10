import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const checkPassword = async (req, res) => {
    try {
        const { password, userId } = req.body

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }
        const verifypassword = await bcrypt.compare(password, user.password)

        if (!verifypassword) {
            return res.status(400).json({
                message: "Please check your Password",
                error: true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const cookiesOption = {
            httpOnly: true,
            secure: true
        }
        return res.cookie('token', token, cookiesOption).status(200).json({
            message: "Login Successsfully",
            token: token,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred",
            error: true
        })
    }
}

export { checkPassword }