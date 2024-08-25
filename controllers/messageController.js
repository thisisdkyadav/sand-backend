import { Chat } from "../models/chat.model"
import { Message } from "../models/message.model"
import { User } from "../models/user.model"
import { getReceiverSocketId, io } from "../socket/socket"

const add_message_to_user = async (phone, message) => {
  try {
    const user = await User.findOneAndUpdate(
      { phone },
      {
        $push: {
          messages: message._id,
        },
      },
      { new: true }
    )

    return user
  } catch (error) {
    console.log(error)
  }
}

export const sendMessage = async (req, res) => {
  try {
    const sender = req.phone
    const receiversPhone = req.body.receiversPhone
    const { content, timestamp, chatId } = req.body

    const newMessage = await Message.create({ sender, content, timestamp, chatId })

    let user = await add_message_to_user(sender, newMessage)

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      })
    }

    const receiverSocketIds = receiversPhone
      .map((receiverPhone) => getReceiverSocketId(receiverPhone))
      .filter((socketId) => socketId)

    if (receiverSocketIds.length > 0) {
      io.to(...receiverSocketIds).emit("newMessage", newMessage)
    }

    return res.status(200).json({
      message: "Message sent successfully",
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in sending message",
      error: error.message,
    })
  }
}

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
