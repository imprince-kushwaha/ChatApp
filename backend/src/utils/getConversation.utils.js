import { conversationModal } from "../models/coversation.model.js"

const getConversation = async (currentUserId) => {
    if (currentUserId) {
        const currentUserConversation = await conversationModal.find({
            "$or": [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        }).sort({ updatedAt: -1 }).populate('message').populate('sender').populate('receiver')

        const conversation = currentUserConversation.map((conv) => {
            const countUnseenMsg = conv.message.reduce((prev, curr) => {
                // console.log(curr?.mssgByUserId) gives object so can't do directly toString
                const msgByUserId=curr?.mssgByUserId?.toString()
                if (msgByUserId!==currentUserId) {
                    return prev + (curr.seen ? 0 : 1)
                    
                }
                else{
                    return prev
                }
                // prev + (curr.seen ? 0 : 1)
            }, 0)
            return {
                _id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unseenMsg: countUnseenMsg,
                lastMsg: conv.message[conv?.message?.length - 1]

            }
        })
        return conversation
        // socket.emit('conversation',conversation)
    } else {
        return []
    }
}

export { getConversation }