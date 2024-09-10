import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Provide Name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Provide Email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Provide Password"],
    },
    profile_pic: {
        type: String,  //Cloudinary URL
        // required: true,
        default:""
    },
}, {timestamps:true}
)


export const User = mongoose.model("User", userSchema)
