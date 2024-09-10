import mongoose, { Schema } from "mongoose";

const messageSchema=new Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const conversationSchema=new Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    message:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Message'
        }
    ]
},{timestamps:true})

export const conversationModal=mongoose.model('Conversation',conversationSchema)
export const messageModal=mongoose.model('Message',messageSchema)