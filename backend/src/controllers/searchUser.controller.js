import { User } from "../models/user.model.js"

const searchUser=async(req,res)=>{
    try {
        const {search}=req.body
        const query=new RegExp(search,"i","g")
        // g globally
        const user=await User.find({
            "$or":[
                {name:query},
                {email:query}
            ]
        }).select("-password")
        return res.status(200).json({
            message:'All User',
            data:user,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

export {searchUser}