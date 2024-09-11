import getUserDetailsFromToken from "../utils/getUserDetailsFromToken.utils.js"

const userDetails=async(req,res)=>{
    try {
        const token=req.cookies.token || ""
        const user=await getUserDetailsFromToken(token)

        return res.status(200).json({
            message:"User details",
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

export {userDetails}