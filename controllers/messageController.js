// import { Chat } from "../models/chat.model.js"
import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"
// import { getReceiverSocketId, io } from "../socket/socket.js"

export const deleteMessage = async (req, res) => {
  try {
    const phone = req.phone
    const { messageId } = req.body

    const message = await Message.findByIdAndDelete(messageId)

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      })
    }

    // Step 2: Remove the message ID from the user's messages array
    await User.findOneAndUpdate(
      { phone },
      {
        $pull: { messages: messageId },
      },
      { new: true }
    )

    return res.status(200).json({
      message: "Message deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in deleting message",
      error: error.message,
    })
  }
}
export const getAllMessages = async (req, res) => {
  try {
    const phone = req.phone

    const user = await User.findOne({ phone }).populate("messages")

    return res.status(200).json({
      message: "Messages fetched successfully",
      messages: user.messages,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting messages",
      error: error.message,
    })
  }
}

// const add_message_to_users = async (participants, message) => {
//   try {
//     let user
//     participants.forEach(async (participant) => {
//       user = await User.findOneAndUpdate(
//         { phone: participant },
//         {
//           $addToSet: { messages: message._id },
//         },
//         { new: true }
//       )
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const sendMessage = async (req, res) => {
//   try {
//     const sender = req.phone
//     let { content, timestamp, chatId, receiversPhone } = req.body

//     const participants = [sender, ...receiversPhone]

//     if (!chatId) {
//       // create new chat
//       let chat = await Chat.create({ participants })

//       // find all users in one query
//       let users = await User.find({ phone: { $in: participants } })

//       // add chat to all users and collect their IDs
//       users.map((user) => {
//         user.chats.push(chat._id)
//       })

//       // save all users in parallel
//       await Promise.all(users.map((user) => user.save()))

//       chatId = chat._id
//     }

//     const newMessage = await Message.create({ sender, content, timestamp, chatId })

//     let user = await add_message_to_users(participants, newMessage)

//     console.log(participants)

//     // if (!user) {
//     //   return res.status(400).json({
//     //     message: "User not found",
//     //   })
//     // }

//     const receiverSocketIds = participants
//       .map((participant) => getReceiverSocketId(participant))
//       .filter((socketId) => socketId)

//     if (receiverSocketIds.length > 0) {
//       // io.to(...receiverSocketIds).emit("newMessage", newMessage)
//       receiverSocketIds.forEach((socketId) => {
//         io.to(socketId).emit("newMessage", newMessage)
//       })
//     }

//     return res.status(200).json({
//       message: "Message sent successfully",
//       receiverSocketIds,
//     })
//   } catch (error) {
//     return res.status(500).json({
//       message: "Error in sending message",
//       error: error.message,
//     })
//   }
// }
