import { Chat } from "../models/chat.model"
import { User } from "../models/user.model"

export const getChats = async (req, res) => {
  try {
    // Logic to get chats
    const phone = req.phone

    const user = await User.findOne({ phone }).populate("chats")

    return res.status(200).json({
      message: "Chats fetched successfully",
      chats: user.chats,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting chats",
      error: error.message,
    })
  }
}

// create chat
export const createChat = async (req, res) => {
  try {
    const { participants } = req.body
    const phone = req.phone

    const user = await User.findOne({ phone }).populate("chats")

    const chat = user.chats.find((chat) => {
      const chatParticipants = chat.participants.map((participant) => participant.phone)
      return participants.every((participant) => chatParticipants.includes(participant))
    })

    if (chat) {
      return res.status(200).json({
        message: "Chat already exists",
        chat,
      })
    }

    const newChat = await Chat.create({ participants })

    user.chats.push(newChat._id)

    await user.save()

    // add chat to all users
    participants.forEach(async (participant) => {
      const user = await User.findOne({ phone: participant })
      user.chats.push(newChat._id)
      await user.save()
    })

    return res.status(200).json({
      message: "Chat created successfully",
      chat: newChat,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating chat",
      error: error.message,
    })
  }
}
