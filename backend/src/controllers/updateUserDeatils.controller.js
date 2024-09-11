import { User } from "../models/user.model.js"
import getUserDetailsFromToken from "../utils/getUserDetailsFromToken.utils.js"

const updateUserDetails=async(req,res)=>{
    try {
        const token=req.cookies.token || ""
        const user=await getUserDetailsFromToken(token)
        const {name,profile_pic}=req.body
        const updateuser=await User.updateOne({_id:user._id},{
            name,profile_pic
        })

        const userInformation=await User.findById(user.id)
        return res.json({
            message:"User updated successfully",
            data:userInformation,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export {updateUserDetails}