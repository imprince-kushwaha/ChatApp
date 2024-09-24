import express from "express"
import { Server } from "socket.io";
import dotenv from "dotenv";
import http from 'http';
import getUserDetailsFromToken from "../utils/getUserDetailsFromToken.utils.js";
import { User } from "../models/user.model.js";
import {conversationModal,messageModal} from '../models/coversation.model.js'
import { getConversation } from "../utils/getConversation.utils.js";

dotenv.config();

const app = express()
// socket connection
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
}
)
// to show user is online or not
const onlineUser=new Set()
// socket running at http://localhost:8000/
io.on('connection', async(socket) => {
    console.log("User connected:", socket.id)

    const token=socket.handshake.auth.token
    // console.log("token",token)
    // current user detail
    const user=await getUserDetailsFromToken(token)
    // console.log("user",user)

    // Create a room
    socket.join(user?._id?.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser',Array.from(onlineUser))

    socket.on('message-page',async(userId)=>{
        // console.log('userid',userId)
        const userDetails=await User.findById(userId).select("-password")

        const payload={
            _id:userDetails?._id,
            name:userDetails?.name,
            email:userDetails?.email,
            profile_pic:userDetails?.profile_pic,
            online:onlineUser.has(userId) //if online return true or false
        }

        socket.emit('message-user',payload)
        // show previous message
        const getConversationMessage=await conversationModal.findOne({
            "$or":[
                {sender:user?._id,receiver:userId},
                {sender:userId,receiver:user?._id}
            ]
        }).populate('message').sort({updatedAt:-1})

        socket.emit('message',getConversationMessage?.message ||[])
    })


    // new message section
    socket.on('new message',async(data)=>{
        console.log("new mwssg",data)
        // check conversation is available or not for both user
        let conversation=await conversationModal.findOne({
            "$or":[
                {sender:data?.sender,receiver:data?.receiver},
                {sender:data?.receiver,receiver:data?.sender}
            ]
        })
        console.log("conv",conversation)
        // if conversation is not availabe we will create one
        if (!conversation) {
            const createConversation=await conversationModal({
                sender:data?.sender,
                receiver:data?.receiver
            })   
            conversation=await createConversation.save()
        }
        const message=await messageModal({
            text:data?.text,
            imageUrl:data?.imageUrl,
            videoUrl:data?.videoUrl,
            mssgByUserId:data?.mssgByUserId
        })
        const saveMessage=await message.save()

        const updateConversation=await conversationModal.updateOne({_id:conversation?._id},{"$push":{message:saveMessage?._id}})

        const getConversationMessage=await conversationModal.findOne({
            "$or":[
                {sender:data?.sender,receiver:data?.receiver},
                {sender:data?.receiver,receiver:data?.sender}
            ]
        }).populate('message').sort({updatedAt:-1})
        // console.log("getconv",getConversationMessage) here on console we get mssg like this as objectId sender: new ObjectId('66e3fce9ad43b0f227f70320'),receiver: new ObjectId('66e2c104c184e44ea992314d'),message: [ new ObjectId('66efddc7da9d46e0d8acad02') ],  to 
        // so use populate and then sort the messages

        io.to(data?.sender).emit('message',getConversationMessage?.message || [])
        io.to(data?.receiver).emit('message',getConversationMessage?.message || [])

        // send conversation
        const conversationSender=await getConversation(data?.sender)
        const conversationReceiver=await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation',conversationSender)
        io.to(data?.receiver).emit('conversation',conversationReceiver)

    })

    // sidebar me chats show
    socket.on('sidebar',async(currentUserId)=>{
        console.log("current user",currentUserId)

        const conversation=await getConversation(currentUserId)

        socket.emit('conversation',conversation)
    })

    socket.on('seen',async(mssgByUserId)=>{
        let conversation=await conversationModal.findOne({
            "$or":[
                {sender:user?._id,receiver:mssgByUserId},
                {sender:mssgByUserId,receiver:user?._id}
            ]
        })

        const conversationMessageId=conversation?.message||[]

        const updateMessage=await messageModal.updateMany(
            {
                _id:{"$in":conversationMessageId},mssgByUserId:mssgByUserId
            },
            {"$set":{seen:true}}
        )

        const conversationSender=await getConversation(user?._id?.toString())
        const conversationReceiver=await getConversation(mssgByUserId)

        io.to(user?._id?.toString()).emit('conversation',conversationSender)
        io.to(mssgByUserId).emit('conversation',conversationReceiver)
    })

    socket.on('disconnect', () => {
        onlineUser.delete(user?._id?.toString())
        console.log("User disconnected:", socket.id)
    })
});


export {app,server}