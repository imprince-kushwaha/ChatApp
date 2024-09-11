const logout=async(req,res)=>{
    try {
        const cookiesOption = {
            httpOnly: true,
            secure: true
        }
        return res.cookie('token', "", cookiesOption).status(200).json({
            message:"Session out",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message||error,
            error:true
        })
    }
}

export {logout}